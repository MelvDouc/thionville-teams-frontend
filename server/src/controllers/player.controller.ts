import type { Router } from "express";
import Controller from "../core/Controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import Player from "../models/player.model.js";
import asyncWrapper from "../services/async-wrapper.service.js";
import { getRatingById } from "../services/web-scraping.service.js";

export default class PlayerController extends Controller {
  protected override model = Player;

  constructor(params: {
    router: Router;
    prefix: `/${string}`;
  }) {
    super(params);
    this.router.put(this.prefix, checkAuth, this.updateAll);
  }

  public updateAll = asyncWrapper(async (req, res) => {
    const players = await Player.getAll();
    const [date] = new Date().toISOString().replace("T", " ").split(".");

    for (const player of players) {
      const rating = await getRatingById(player.ffeId);
      await player.update({
        rating,
        updatedAt: date
      });
    }

    res.json({ success: true });
  });
}