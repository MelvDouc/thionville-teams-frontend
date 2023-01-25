import Model from "../core/Model.js";
import { query } from "../services/database.service.js";
import { IMatch, MatchResult } from "../types.js";
import Team from "./team.model.js";

export default class Match extends Model implements IMatch {
  protected static override readonly TABLE_NAME = "tchMatch";

  public static override create(entity: IMatch): Match {
    return new Match(entity);
  }

  public static override async getAll<T = Match>(): Promise<T[]> {
    const thionville = await Team.getOne([], { id: process.env.THIONVILLE_TEAM_ID }) as Awaited<Team>;
    const sql = Team.getSql("all-matches.sql").replace(/__\w+__/g, (prop) => {
      return `"${thionville[prop.slice(2, -2) as keyof Team]}"`;
    });
    const result = await query(sql) as Awaited<[Match[], any[]]>;
    return result[0].map(this.create, this) as T[];
  }

  public static async getResults(matchId: number) {
    const sql = Match.getSql("match-results.sql");
    const search = (await query(sql, [matchId]))[0] as MatchResult[];
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