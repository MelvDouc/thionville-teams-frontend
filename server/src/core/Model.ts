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

  public static async getOne(columns: (keyof Model)[] = [], filter: MySqlSearchRecord<Model> = {}): Promise<InstanceType<typeof this> | null> {
    const entity = await getOne(this.TABLE_NAME, columns, filter);
    if (entity)
      return this.create(entity);
    return entity as null;
  }

  public static async getAll(columns: (keyof Model)[] = [], filter: MySqlSearchRecord<Model> = {}): Promise<Model[]> {
    const entities = await getAll(this.TABLE_NAME, columns, filter);
    return entities.map((entity) => this.create(entity));
  }

  constructor() { }

  public id: number;

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