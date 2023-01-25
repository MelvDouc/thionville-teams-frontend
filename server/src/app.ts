import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.router.js";
import clientRouter from "./routes/client.router.js";

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clientRouter);
app.use("/api/v1", apiRouter);

app.listen(port, () => console.log(`App running on http://localhost:${port} ...`));