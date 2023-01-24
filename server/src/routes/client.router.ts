import { Router } from "express";
import { readFile } from "fs/promises";
import { join } from "path";
import { Req, Res } from "../types.js";

const html = await readFile(join("client", "index.html"));
const clientRouter = Router();

clientRouter.get("/", async (req: Req, res: Res) => {
  return res.contentType("html").send(html);
});

export default clientRouter;