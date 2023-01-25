import Model from "../core/Model.js";
import { query } from "../services/database.service.js";
import { ITeam, MySqlSearchRecord, Roster } from "../types.js";


export default class Team extends Model implements ITeam {
  protected static override readonly TABLE_NAME = "team";

  public static override create(entity: ITeam): Team {
    return new Team(entity);
  }

  public static override async getOne(columns: (keyof Team)[] = [], filter: MySqlSearchRecord<Team> = {}): Promise<Team | null> {
    // @ts-ignore
    return await super.getOne.apply(this, [columns, filter]);
  }

  public static override async getAll(columns: (keyof Team)[] = [], filter: MySqlSearchRecord<Team> = {}): Promise<Team[]> {
    // @ts-ignore
    return await super.getAll.apply(this, [columns, filter]);
  }

  public static async getRoster(matchId: number): Promise<Roster> {
    const sql = `
      SELECT
        player.ffeId,
        CONCAT(firstName, " ", UPPER(lastName)) AS name,
        CONCAT(board, IF(isWhite = (board % 2 = 1), "B", "N")) AS boardAndColor
      FROM roster
        JOIN player ON roster.playerId = player.id
        JOIN tchMatch ON roster.matchId = tchMatch.id
      WHERE tchMatch.id = ?
      ORDER BY player.rating DESC
    `;

    const [result] = await query(sql, [matchId]) as Awaited<[Roster, any[]]>;
    return result;
  }

  public name: string;
  public address: string;
  public city: string;
  public zip: string;
  public email: string;
  public tel: string;
  public website: string | null;

  constructor(team?: ITeam) {
    super();
    if (team)
      Object.assign(this, team);
  }
}