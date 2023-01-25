import mysql from "mysql2/promise.js";
import { MySqlSearchRecord } from "../types.js";

if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config();
}

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME
});

console.log("Database connection established.");

export const query = connection.query.bind(connection);

function parseMysqlOperators<T extends {}>(source: MySqlSearchRecord<T>, separator: string = ",", values: (string | number)[] = []): {
  placeholders: string;
  values: (string | number)[];
} {
  const placeholders = Object.entries(source)
    .map(([key, value]) => {
      if (key === "$and")
        return `(${parseMysqlOperators(value as MySqlSearchRecord<T>, " AND ", values).placeholders})`;
      if (key === "$or")
        return `(${parseMysqlOperators(value as MySqlSearchRecord<T>, " OR ", values).placeholders})`;
      values.push(value as string | number);
      return `${key} = ?`;
    })
    .join(separator);

  return {
    placeholders,
    values
  };
}

export async function getOne<T extends {}>(tableName: string, columns: (keyof T)[], filter: MySqlSearchRecord<T>): Promise<T | null> {
  const { placeholders, values } = parseMysqlOperators(filter);
  const cols = columns.length ? columns.join() : "*";
  const sql = `SELECT ${cols} FROM ${tableName} WHERE ${placeholders} LIMIT 1 `;
  const [search] = await connection.query(sql, values) as Awaited<[T[], any[]]>;
  return search[0] ?? null;
}

export async function getAll<T extends {}>(tableName: string, columns: (keyof T)[], filter: MySqlSearchRecord<T>): Promise<T[]> {
  const { placeholders, values } = parseMysqlOperators(filter);
  const cols = columns.length ? columns.join() : "*";
  let sql = `SELECT ${cols} FROM ${tableName}`;
  if (placeholders.length)
    sql += ` WHERE ${placeholders}`;
  const [search] = await connection.query(sql, values) as Awaited<[T[], any[]]>;
  return search ?? [];
}

export async function create<T extends {}>(tableName: string, entity: Partial<T>): Promise<void> {
  const values = Object.values(entity);
  const sql = `INSERT INTO ${tableName} (${Object.keys(entity).join()})
    VALUES (${Array(values.length).fill('?').join()})`;
  await connection.query(sql, values);
}

export async function update<T extends {}>(
  tableName: string,
  updates: Exclude<MySqlSearchRecord<T>, "$and" | "$or">,
  filter: MySqlSearchRecord<T>
): Promise<void> {
  const { placeholders: updatePlaceholders, values: updateValues } = parseMysqlOperators(updates);
  const { placeholders: filterPlaceholders, values: filterValues } = parseMysqlOperators(filter);
  const sql = `UPDATE ${tableName} SET ${updatePlaceholders} WHERE ${filterPlaceholders}`;
  await connection.query(sql, updateValues.concat(filterValues));
}

export async function deleteAll<T extends {}>(tableName: string, filter: MySqlSearchRecord<T>) {
  const { placeholders, values } = parseMysqlOperators(filter);
  const sql = `DELETE FROM ${tableName} WHERE ${placeholders}`;
  await connection.query(sql, values);
}

/*
SELECT
  round,
  team.name,
  IF(isHome, NULL, CONCAT(team.address, "\n", team.zip, " ", UPPER(team.city))) AS address,
  tchMatch.date
FROM tchMatch
JOIN team WHERE team.id = tchMatch.opponentId;

SELECT
  player.firstName as firstName,
  player.lastName as lastName,
  roster.board AS board,
  roster.result AS result,
  IF(tchMatch.isWhite = (roster.board % 2 = 1), "white", "black") AS color,
  team.name as opposingTeam
FROM roster
  JOIN player ON player.fideId = roster.playerFideId
  JOIN tchMatch ON tchMatch.id = roster.matchId
  JOIN team ON team.id = tchMatch.opponentId;;
*/