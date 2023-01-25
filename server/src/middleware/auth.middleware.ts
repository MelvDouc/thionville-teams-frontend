import { NextFn, Req, Res } from "../types.js";

export function checkAuth(req: Req, res: Res, next: NextFn) {
  if (req.header("authorization") !== process.env.API_TOKEN) {
    res.status(404).json({ success: false });
    return;
  }

  next();
}