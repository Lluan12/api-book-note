import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

import notesRouter from "./routes/books.route";

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", notesRouter);

export default app;
