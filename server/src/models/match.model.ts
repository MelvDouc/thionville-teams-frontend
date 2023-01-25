import Model from "../core/Model.js";
import { query } from "../services/database.service.js";
import { IMatch } from "../types.js";
import Team from "./team.model.js";

export default class Match extends Model implements IMatch {
  protected static override readonly TABLE_NAME = "tchMatch";

  public static override create(entity: IMatch): Match {
    return new Match(entity);
  }

  public static override async getAll<T = Match>(): Promise<T[]> {
    const thionville = await Team.getOne([], { id: process.env.THIONVILLE_TEAM_ID }) as Awaited<Team>;
    const address = thionville?.address ?? "3 rue du Cygne",
      city = thionville?.city ?? "Thionville",
      zip = thionville?.zip ?? "57100";

    const sql = `
      SELECT
        tchMatch.id as id,
        tchMatch.round,
        team.name AS opponent,
        IF(tchMatch.isHome, "${address}", team.address) AS address,
        IF(tchMatch.isHome, "${city}", team.city) AS city,
        IF(tchMatch.isHome, "${zip}", team.zip) AS zip,
        tchMatch.date
      FROM tchMatch
      JOIN team ON team.id = tchMatch.opponentId
  `;
    const result = await query(sql) as Awaited<[Match[], any[]]>;
    return result[0].map(this.create, this) as T[];
  }

  public static async getResults(matchId: number) {
    const sql = `
      SELECT
        CONCAT(board, IF(isWhite = (board % 2 = 1), "B", "N")) AS boardAndColor,
        CONCAT(firstName, " ", UPPER(lastName)) AS name,
        result,
        team.name as opponent
      FROM roster
        JOIN player ON player.id = roster.playerId
        JOIN tchMatch ON tchMatch.id = roster.matchId
        JOIN team ON team.id = tchMatch.opponentId
      WHERE tchMatch.id = ?
    `;

    const search = (await query(sql, [matchId]))[0] as { boardAndColor: string; name: string; result: number; opponent: string; }[];
    return {
      opponent: search[0]?.opponent ?? "N.D.",
      results: search.map(({ opponent, ...others }) => others)
    };

  }

  public round: number;
  public opponent: string;
  public address: string;
  public city: string;
  public zip: string;
  public date: string;

  constructor(match?: IMatch) {
    super();
    if (match)
      Object.assign(this, match);
  }
}