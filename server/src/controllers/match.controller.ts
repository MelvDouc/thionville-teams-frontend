import Controller, { asyncWrapper } from "../core/Controller.js";
import Match from "../models/match.model.js";

export default {
  getMatch: Controller.getOne(Match),
  getMatchs: Controller.getAll(Match),
  getFullMatchesByTeamId: asyncWrapper(async (req, res) => {
    const entities = await Match.getFullInfo(+req.query.id!);
    res.json(entities);
  }),
  createMatch: Controller.createOne(Match),
  updateMatch: Controller.updateOne(Match),
  deleteMatch: Controller.deleteOne(Match)
};