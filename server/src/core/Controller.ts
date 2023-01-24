import type { Router } from "express";
import asyncWrapper from "../services/async-wrapper.service.js";
import { Req, Res } from "../types.js";
import type Model from "./Model.js";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

function getHttpMethodDecorator(method: HttpMethod) {
  return (path: string) => {
    return (target: Controller, _propertyKey: string, descriptor: PropertyDescriptor) => {
      const handler = descriptor.value.bind(target);
      target.routes ??= {} as typeof target.routes;
      target.routes[method] ??= {};
      if (target.routes[method][path])
        target.routes[method][path].push(handler);
      else
        target.routes[method][path] = [handler];
    };
  };
}

export default abstract class Controller {
  public static Get = getHttpMethodDecorator("get");
  public static Post = getHttpMethodDecorator("post");
  public static Put = getHttpMethodDecorator("put");
  public static Patch = getHttpMethodDecorator("patch");
  public static Delete = getHttpMethodDecorator("delete");

  protected readonly router: Router;
  protected readonly model: typeof Model;
  public readonly prefix: `/${string}`;
  public routes: Record<HttpMethod, Record<string, ((req: Req, res: Res) => any)[]>>;

  constructor({ router, prefix }: {
    router: Router;
    prefix: `/${string}`;
  }) {
    this.router = router;
    this.prefix = prefix;
    let method: HttpMethod,
      path: string;

    for (method in this.routes) {
      for (path in this.routes[method]) {
        this.router[method](path, ...this.routes[method][path]);
      }
    }
  }

  public getRouter = () => {
    return this.router;
  };

  public getOne = asyncWrapper(async (req, res) => {
    const entity = await this.model.getOne([], { id: +req.params.id });
    return res.json(entity);
  });

  public getAll = asyncWrapper(async (req, res) => {
    const entities = await this.model.getAll();
    res.json(entities);
  });

  public createOne = asyncWrapper(async (req, res) => {
    const entity = this.model.create(req.body);
    await entity.save();
    res.json({ success: true });
  });

  public updateOne = asyncWrapper(async (req, res) => {
    const entity = await this.model.getOne([], { id: +req.params.id });
    const { updates } = req.body;

    if (!entity || updates == null || typeof updates !== "object")
      return res.json({ success: false });

    await entity.update(updates);
    res.json({ success: true });
  });

  public deleteOne = asyncWrapper(async (req, res) => {
    const entity = this.model.create(req.params.id);
    await entity.delete();
    res.json({ success: true });
  });

  @Controller.Get("/test")
  test() { }
}