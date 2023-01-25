import type { Router } from "express";
import { AsyncWrapper, getHttpMethodDecorator } from "../services/decorators.service.js";
import { HttpMethod, Req, Res } from "../types.js";
import type Model from "./Model.js";

export default abstract class Controller {
  public static readonly Get = getHttpMethodDecorator("get");
  public static readonly Post = getHttpMethodDecorator("post");
  public static readonly Put = getHttpMethodDecorator("put");
  public static readonly Patch = getHttpMethodDecorator("patch");
  public static readonly Delete = getHttpMethodDecorator("delete");
  public static readonly AsyncWrapper = AsyncWrapper;

  protected readonly router: Router;
  protected readonly model: typeof Model;
  public routes: Record<HttpMethod, Record<string, ((req: Req, res: Res) => any)[]>>;

  constructor({ router }: { router: Router; }) {
    this.router = router;
    let method: HttpMethod,
      path: string;

    for (method in this.routes) {
      for (path in this.routes[method]) {
        this.router[method](path, ...this.routes[method][path]);
      }
    }
  }

  public getRouter() {
    return this.router;
  };

  @AsyncWrapper
  public async getOne(req: Req, res: Res) {
    const entity = await this.model.getOne([], { id: +req.params.id });
    return res.json(entity);
  }

  @AsyncWrapper
  public async getAll(req: Req, res: Res) {
    const entities = await this.model.getAll();
    res.json(entities);
  }

  @AsyncWrapper
  public async createOne(req: Req, res: Res) {
    const entity = this.model.create(req.body);
    await entity.save();
    res.json({ success: true });
  }

  @AsyncWrapper
  public async updateOne(req: Req, res: Res) {
    const entity = await this.model.getOne([], { id: +req.params.id });
    const { updates } = req.body;

    if (!entity || updates == null || typeof updates !== "object")
      return res.json({ success: false });

    await entity.update(updates);
    res.json({ success: true });
  }

  @AsyncWrapper
  public async deleteOne(req: Req, res: Res) {
    const entity = this.model.create(req.params.id);
    await entity.delete();
    res.json({ success: true });
  }
}