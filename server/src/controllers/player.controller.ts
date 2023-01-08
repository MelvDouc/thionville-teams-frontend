import db from "../database/db.js";

const getPlayers = async (_req: Req, res: Res) => {
  const players = await db.getPlayers();
  return res.render("players.pug", {
    players
  });
};

const createPlayer_GET = (req: Req, res: Res) => {
  res.render("player.create.pug", { player: {} });
};

const createPlayer_POST = async (req: Req, res: Res) => {
  const playerData = {
    ffeId: req.body.ffeId,
    fideId: req.body.fideId,
    email: req.body.email,
    tel: req.body.tel,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cat: req.body.cat,
    active: req.body.active === "active_true",
    rating: parseInt(req.body.rating) || 0
  };
  await db.createPlayer(playerData);
  return res.redirect("/players");
};

const updatePlayer_GET = async (req: Req, res: Res) => {
  const player = await db.getPlayer({
    ffeId: req.query.ffeId as string
  });
  if (!player)
    return res.redirect("/");
  res.render("player.update.pug", { player });
};

const updatePlayer_POST = async (req: Req, res: Res) => {
  const { ffeId } = req.query;
  const updates = {
    ffeId: req.body.ffeId,
    fideId: req.body.fideId,
    email: req.body.email,
    tel: req.body.tel,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cat: req.body.cat,
    active: req.body.active === "active_true",
    rating: parseInt(req.body.rating)
  };
  await db.updatePlayer(ffeId as string, updates);
  res.redirect("/players");
};

export default {
  getPlayers,
  createPlayer_GET,
  createPlayer_POST,
  updatePlayer_GET,
  updatePlayer_POST
};