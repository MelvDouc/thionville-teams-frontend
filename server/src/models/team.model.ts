import Model from "../core/Model.js";
import { query } from "../services/database.service.js";
import { ITeam, Roster } from "../types.js";

export default class Team extends Model implements ITeam {
  protected static override readonly TABLE_NAME = "team";

  public static override create(entity: ITeam): Team {
    return new Team(entity);
  }

  public static async getRoster(matchId: number): Promise<Roster> {
    const sql = Team.getSql("roster.sql");
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

console.log(
  await Team.getRoster(5)
);