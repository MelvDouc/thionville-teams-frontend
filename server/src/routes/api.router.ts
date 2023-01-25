import { Router } from "express";
import matchController from "../controllers/match.controller.js";
import playerController from "../controllers/player.controller.js";
import teamController from "../controllers/team.controller.js";
import userController from "../controllers/user.controller.js";

const apiRouter = Router();

apiRouter
  .get("/players", playerController.getPlayer)
  .get("/players/all", playerController.getPlayers)
  .post("/players", playerController.createPlayer)
  .put("/players", playerController.updatePlayer)
  .put("/players/all", playerController.updatePlayersFromTeam)
  .delete("/players", playerController.deletePlayer);

apiRouter
  .get("/teams", teamController.getTeam)
  .get("/teams/all", teamController.getTeams)
  .post("/teams", teamController.createTeam)
  .put("/teams", teamController.updateTeam)
  .delete("/teams", teamController.deleteTeam);

apiRouter
  .get("/matches", matchController.getMatch)
  .get("/matches/all", matchController.getMatchs)
  .get("/matches/full-info", matchController.getFullMatchesByTeamId)
  .post("/matches", matchController.createMatch)
  .put("/matches", matchController.updateMatch)
  .delete("/matches", matchController.deleteMatch);

apiRouter
  .get("/users", userController.getUser);

export default apiRouter;