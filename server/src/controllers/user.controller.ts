import Controller from "../core/Controller.js";
import User from "../models/user.model.js";

export default class UserController extends Controller {
  protected override model = User;
}