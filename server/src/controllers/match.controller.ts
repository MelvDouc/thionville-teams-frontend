import Controller from "../core/Controller.js";
import Match from "../models/match.model.js";

export default class MatchController extends Controller {
  protected override model = Match;
}