import db from "../database/db.js";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
});


const match = async (req: Req, res: Res) => {
  const matchId = +req.params.matchId;
  const match = (await db.getMatches()).find((match) => match.id === matchId);
  (match as any).date = dateFormatter.format(match!.date);
  const roster = await db.getRoster(matchId);
  return res.render("match.pug", {
    match,
    roster
  });
};

const matches = async (_req: Req, res: Res) => {
  const matches = (await db.getMatches()).map(({ date, ...others }) => ({
    date: dateFormatter.format(date),
    ...others
  }));
  return res.render("home.pug", {
    matches
  });
};

export default {
  match,
  matches,
};