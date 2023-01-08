import mysql2 from "mysql2/promise";

if (process.env.NODE_ENV !== "production") {
  (await import("dotenv")).config();
}

const pool = mysql2.createPool({
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log(`Database connected.`);

const query = pool.query.bind(pool);

const getPlayer = async (data: Partial<Player>): Promise<Player | null> => {
  const placeholders = Object.keys(data).map((key) => `${key} = ?`).join(" AND ");
  const [result] = await query(
    `SELECT * FROM players WHERE ${placeholders} LIMIT 1;`,
    Object.values(data)
  );
  if (Array.isArray(result) && result[0])
    return result[0] as Player;
  return null;
};

const getPlayers = async (): Promise<Player[]> => {
  return (
    await query(`SELECT * FROM players ORDER BY rating DESC;`) as [Player[], any[]]
  )[0];
};

const updatePlayer = async (ffeId: string, updates: Partial<Player>) => {
  const placeholders = Object.keys(updates).map((key) => `${key} = ?`).join();
  const action = await query(`UPDATE players SET ${placeholders} WHERE ffeId = ?;`, [
    ...Object.values(updates), ffeId
  ]);
  console.log(action);
};

const getMatches = async (): Promise<MatchWithOpponent[]> => {
  return (await query(`
    SELECT
      matches.id AS id,
      matches.round,
      matches.date,
      matches.isHome,
      matches.isWhiteOnBoard1,
      teams.name AS opponent,
      IF(matches.isHome, 'À domicile', CONCAT(teams.address, '\n', teams.zip, ' ', teams.city)) AS address
    FROM matches
    JOIN teams
      ON matches.opponentId = teams.ffeId;
  `) as [MatchWithOpponent[], any[]])[0];
};

const getRoster = async (matchId: number): Promise<{
  ffeId: string;
  firstName: string;
  lastName: string;
  rating: number;
}[]> => {
  const sql = `SELECT
    players.ffeId,
    players.firstName,
    players.lastName,
    players.rating
  FROM playersByMatch
  JOIN players
    ON players.ffeId = playersByMatch.playerFfeId
  WHERE playersByMatch.matchId = ?
    AND playersByMatch.role = 'player'
  ORDER BY players.rating DESC;`;
  const [result] = await query(sql, [matchId]);
  return result as any;
};

export default {
  getPlayer,
  getPlayers,
  updatePlayer,
  getMatches,
  getRoster
};