import Controller from "../core/Controller.js";
import Team from "../models/team.model.js";

export default {
  getTeam: Controller.getOne(Team),
  getTeams: Controller.getAll(Team),
  createTeam: Controller.createOne(Team),
  updateTeam: Controller.updateOne(Team),
  deleteTeam: Controller.deleteOne(Team)
};