import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

import booksRouter from "./routes/books.route";
import notesRouter from "./routes/notes.route";

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/books", booksRouter);
app.use("/api/notes", notesRouter);

export default app;
