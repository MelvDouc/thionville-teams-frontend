import { Router } from "express";
import matchController from "../controllers/match.controller.js";
import playerController from "../controllers/player.controller.js";
import teamController from "../controllers/team.controller.js";
import userController from "../controllers/user.controller.js";
import { Controller, HttpMethod, Path } from "../types.js";

const apiRouter = Router();

addControllerMethods(playerController);
addControllerMethods(matchController);
addControllerMethods(teamController);
addControllerMethods(userController);

apiRouter.all("*", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

function addControllerMethods(controller: Controller) {
  let httpMethod: HttpMethod,
    path: Path;

  for (httpMethod in controller) {
    const handlers = controller[httpMethod]!;
    for (path in handlers) {
      const handler = handlers[path] as any;
      apiRouter[httpMethod](path, handler);
    }
  }
}

export default apiRouter;