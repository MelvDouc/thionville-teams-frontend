import asyncWrapper from "../middleware/async-wrapper.middleware.js";
import { Controller, Path } from "../types.js";
import type Model from "./Model.js";

function createGetOneFn(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = await model.getOne([], { id: +req.params.id });
    return res.json(entity);
  });
}

function createGetAllFn(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entities = await model.getAll();
    res.json(entities);
  });
}

function createCreateOneFn(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = model.create(req.body);
    await entity.save();
    res.json({ success: true });
  });
}

function createUpdateOneFn(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = await model.getOne([], { id: +req.params.id });
    const { updates } = req.body;

    if (!entity || updates == null || typeof updates !== "object")
      return res.json({ success: false });

    await entity.update(updates);
    res.json({ success: true });
  });
}

function createDeleteOneFn(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = model.create(req.params.id);
    await entity.delete();
    res.json({ success: true });
  });
}

export default function Controller(model: typeof Model, prefix: Path) {
  return {
    get: {
      [`${prefix}/:id`]: createGetOneFn(model),
      [prefix]: createGetAllFn(model)
    },
    post: {
      [prefix]: createCreateOneFn(model)
    },
    put: {
      [`${prefix}/:id`]: createUpdateOneFn(model)
    },
    delete: {
      [`${prefix}/:id`]: createDeleteOneFn(model)
    }
  } as unknown as Controller;
}