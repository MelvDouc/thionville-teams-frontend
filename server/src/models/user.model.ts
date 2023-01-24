import Model from "../core/Model.js";
import { hashPassword } from "../services/password.service.js";
import { IUser, UserRole } from "../types.js";


export default class User extends Model implements IUser {
  protected static override readonly TABLE_NAME = "user";

  public static override create(entity: IUser): User {
    return new User(entity);
  }

  public email: string;
  public password: string;
  public token: string;
  public role: UserRole;
  public createdAt: string;
  public updatedAt: string;

  constructor(user?: IUser) {
    super();
    if (user)
      Object.assign(this, user);
  }

  override async save() {
    this.password = await hashPassword(this.password);
    return await super.save();
  }
}