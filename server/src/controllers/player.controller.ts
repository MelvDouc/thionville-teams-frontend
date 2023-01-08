import db from "../database/db.js";

const getPlayers = async (_req: Req, res: Res) => {
  const players = await db.getPlayers();
  return res.render("players.pug", {
    players
  });
};

const updatePlayer_GET = async (req: Req, res: Res) => {
  const player = await db.getPlayer({
    ffeId: req.query.ffeId as string
  });
  if (!player)
    return res.redirect("/");
  res.render("update-player.pug", { player });
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
  updatePlayer_GET,
  updatePlayer_POST
};