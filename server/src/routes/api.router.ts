import { Router } from "express";
import MatchController from "../controllers/match.controller.js";
import PlayerController from "../controllers/player.controller.js";
import TeamController from "../controllers/team.controller.js";
import UserController from "../controllers/user.controller.js";

const apiRouter = Router();

new PlayerController({ router: apiRouter });
new TeamController({ router: apiRouter });
new MatchController({ router: apiRouter });
const uc = new UserController({ router: apiRouter });

console.log(uc.getRouter());

apiRouter.all("*", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

export default apiRouter;