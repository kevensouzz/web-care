import dotenv from "dotenv";
import path from "path";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./routes/router";

dotenv.config();
const app = express();
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbConnectionURL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json(error);
});

mongoose
  .connect(dbConnectionURL)
  .then(() => {
    console.log("DATABASE IS ON!");
    app.listen(port, () => console.log("SERVER IS ON!"));
  })
  .catch((error) => console.log(error));
