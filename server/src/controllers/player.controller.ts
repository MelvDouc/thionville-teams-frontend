import Controller from "../core/Controller.js";
import asyncWrapper from "../middleware/async-wrapper.middleware.js";
import Player from "../models/player.model.js";
import { getRatingById } from "../services/web-scraping.service.js";

const playerController = Controller(Player, "/players");
playerController.put!["/players"] = asyncWrapper(async (req, res) => {
  const teamId = +(req.query.team_id!);

  if (isNaN(teamId))
    return res.json({
      success: false,
      error: "A team id is required."
    });

  const players = await Player.getAll<Player>([], { teamId });
  const [updatedAt] = new Date().toISOString().replace("T", " ").split(".");

  for (const player of players) {
    const rating = await getRatingById(player.id);
    await player.update({ rating, updatedAt });
  }

  res.json({ success: true });
});

export default playerController;