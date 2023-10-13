import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router";
import passport from "passport";
import session from "express-session";
import "./controllers/user"

if (!process.env.SECRET_SESSION) {
  throw new Error("Secret Session is not defined!");
}

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false},
}))
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`)
  .then(() => {
    app.listen(5000, () => console.log("RUNNING!"));
  })
  .catch((error) => console.log(error));
