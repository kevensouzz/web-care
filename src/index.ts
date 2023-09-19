import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router";
import errorMiddleware from "./helpers/error";

dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5000",
  optionSucessStatus: 200,
};
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbConnectionURL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.enable("trust proxy");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use(errorMiddleware);

mongoose
  .connect(dbConnectionURL)
  .then(() => {
    console.log("DATABASE IS ON!");
    app.listen(port, () => console.log("SERVER IS ON!"));
  })
  .catch((error) => console.log(error));
