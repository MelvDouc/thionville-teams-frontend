import Controller from "../core/Controller.js";
import User from "../models/user.model.js";

export default {
  getUser: Controller.getOne(User)
};