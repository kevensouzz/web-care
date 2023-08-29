import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router";

dotenv.config();
const app = express();
const PORT: string | number = process.env.PORT || 5000;
const dbUSER = process.env.DB_USER;
const dbPASS = process.env.DB_PASS;
const dbHOST = process.env.DB_HOST;
const dbURL = `mongodb+srv://${dbUSER}:${dbPASS}@${dbHOST}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DATABASE IS ON!");
    app.listen(PORT, () => console.log("SERVER IS ON!"));
  })
  .catch((error) => console.log(error));
