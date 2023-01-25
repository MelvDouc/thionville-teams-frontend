import Model from "../core/Model.js";
import { query } from "../services/database.service.js";
import { IPlayer } from "../types.js";

export default class Player extends Model implements IPlayer {
  protected static override readonly TABLE_NAME = "player";

  public static override create(entity: IPlayer): Player {
    return new Player(entity);
  }

  public ffeId: string;
  public lastName: string;
  public firstName: string;
  public email: string;
  public tel: string | null;
  public rating: number;
  public teamId: number;
  public updatedAt: string;

  constructor(player?: IPlayer) {
    super();
    if (player)
      Object.assign(this, player);
  }

  public async getAverageScore(): Promise<number> {
    const sql = Player.getSql("average-score.sql");
    const search = await query(sql, [this.id]) as Awaited<[[{ average: number; }], any[]]>;
    return search[0][0].average;
  }
}