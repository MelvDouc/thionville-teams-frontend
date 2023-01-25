import Model from "../core/Model.js";
import { query } from "../services/database.service.js";
import { IDbMatch, IMatch, MatchResult } from "../types.js";

export default class Match extends Model implements IDbMatch {
  protected static override readonly TABLE_NAME = "tchMatch";

  public static override create(entity: IDbMatch): Match {
    return new Match(entity);
  }

  public static async getFullInfo({ season, teamId }: { season: number; teamId: number; }) {
    const sql = Match.getSql("full-match-info.sql");
    const [matches] = await query(sql, [season, teamId, teamId]) as Awaited<[IMatch[], any[]]>;
    return matches;
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
  public whiteTeamId: number;
  public blackTeamId: number;
  public homeTeamId: number;
  public season: number;
  public date: string;

  constructor(match?: IDbMatch) {
    super();
    if (match)
      Object.assign(this, match);
  }
}