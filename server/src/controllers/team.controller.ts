import Controller from "../core/Controller.js";
import Team from "../models/team.model.js";

export default class TeamController extends Controller {
  protected override model = Team;
}