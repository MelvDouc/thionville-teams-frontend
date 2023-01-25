import {
  create,
  deleteAll,
  getAll,
  getOne,
  update
} from "../services/database.service.js";
import {
  MySqlSearchRecord,
  WithId
} from "../types.js";

export default abstract class Model implements WithId {
  protected static readonly TABLE_NAME: string;

  public static create(entity: unknown): InstanceType<typeof this> {
    throw new Error("not implemented");
  }

  public static async getOne<T extends Model>(columns: (keyof T)[] = [], filter: MySqlSearchRecord<T> = {}): Promise<T | null> {
    const entity = await getOne(this.TABLE_NAME, columns, filter);
    if (entity)
      return this.create(entity) as T;
    return entity as null;
  }

  public static async getAll<T extends Model>(columns: (keyof T)[] = [], filter: MySqlSearchRecord<T> = {}): Promise<T[]> {
    const entities = await getAll(this.TABLE_NAME, columns, filter);
    return entities.map((entity) => this.create(entity)) as T[];
  }

  public id: number;

  constructor() { }

  public get tableName(): string {
    return (this.constructor as typeof Model).TABLE_NAME;
  }

  public async save() {
    await create(this.tableName, this);
  }

  public async update(updates: Partial<this>) {
    await update(this.tableName, updates as MySqlSearchRecord<Model>, { id: this.id });
  }

  public async delete() {
    await deleteAll(this.tableName, { id: this.id });
  }
}