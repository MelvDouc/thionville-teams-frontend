import asyncWrapper from "../middleware/async-wrapper.middleware.js";
import type Model from "./Model.js";

function getOne(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = await model.getOne([], { id: +req.query.id! });
    return res.json(entity);
  });
}

function getAll(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entities = await model.getAll();
    res.json(entities);
  });
}

function createOne(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = model.create(req.body);
    await entity.save();
    res.json({ success: true });
  });
}

function updateOne(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = await model.getOne<Model>([], { id: +req.query.id! });
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
  });
}

function deleteOne(model: typeof Model) {
  return asyncWrapper(async (req, res) => {
    const entity = await model.getOne<Model>([], { id: +req.query.id! });
    if (entity)
      await entity.delete();
    res.json({ success: true });
  });
}

export { asyncWrapper };

export default {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne
};