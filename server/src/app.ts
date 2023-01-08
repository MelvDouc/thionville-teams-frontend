import express from "express";
import router from "./routes/router.js";
import "./database/db.js";

const app = express();
const port = process.env.PORT || 10_000;

app.set("views", "client");
app.set("view engine", "pug");
app.locals.basedir = "client";

app.use(express.static("client/static"));
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(port, () => console.log(`App running on http://localhost:${port} ...`));