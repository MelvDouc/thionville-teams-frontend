import Controller from "../core/Controller.js";
import asyncWrapper from "../middleware/async-wrapper.middleware.js";
import Player from "../models/player.model.js";
import { getRatingById } from "../services/web-scraping.service.js";

const playerController = Controller(Player, "/players");
playerController.put!["/players"] = asyncWrapper(async (req, res) => {
  const players = await Player.getAll();
  const [date] = new Date().toISOString().replace("T", " ").split(".");

  for (const player of players) {
    const rating = await getRatingById(player.id);
    console.log(`rating: ${rating}`);
    await player.update({ rating, updatedAt: date });
  }

  res.json({ success: true });
});

export default playerController;