import asyncWrapper from "../middleware/async-wrapper.middleware.js";
import { Controller, Path } from "../types.js";
import type Model from "./Model.js";

export default function Controller<T extends typeof Model>(model: T, prefix: Path) {
  const prefixWithId = `${prefix}/:id`;

  return {
    get: {
      [prefixWithId]: asyncWrapper(async (req, res) => {
        const entity = await model.getOne([], { id: +req.params.id });
        return res.json(entity);
      }),
      [prefix]: asyncWrapper(async (req, res) => {
        const entities = await model.getAll();
        res.json(entities);
      })
    },
    post: {
      [prefix]: asyncWrapper(async (req, res) => {
        const entity = model.create(req.body);
        await entity.save();
        res.json({ success: true });
      })
    },
    put: {
      [prefixWithId]: asyncWrapper(async (req, res) => {
        const entity = await model.getOne<Model>([], { id: +req.params.id });
        const { updates } = req.body;

        if (!entity)
          return res.json({
            success: false,
            error: "Entity not found."
          });

        if (typeof updates !== "object" || updates === null)
          return res.json({
            success: false,
            error: "Updates missing."
          });

        await entity.update(updates);
        res.json({ success: true });
      })
    },
    delete: {
      [prefixWithId]: asyncWrapper(async (req, res) => {
        const entity = await model.getOne<Model>([], { id: +req.params.id });
        if (entity)
          await entity.delete();
        res.json({ success: true });
      })
    }
  } as Controller;
}