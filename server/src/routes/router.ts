import { Router } from "express";
import matchController from "../controllers/match.controller.js";
import playerController from "../controllers/player.controller.js";

const router = Router();

router
  .get("/", matchController.matches)
  .get("/players", playerController.getPlayers);
router.route("/players/create")
  .get(playerController.createPlayer_GET)
  .post(playerController.createPlayer_POST);
router.route("/players/update")
  .get(playerController.updatePlayer_GET)
  .post(playerController.updatePlayer_POST);
router.get("/match/:matchId", matchController.match);

export default router;