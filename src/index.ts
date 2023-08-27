import dotenv from "dotenv";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

dotenv.config();
const PORT: string | number = process.env.PORT || 5000;
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.endsWith("/") && req.path.length > 1) {
    const newPath = req.path.slice(0, -1);
    const query = req.url.slice(req.path.length);
    res.redirect(301, newPath + query);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/home", (req: Request, res: Response) => {
  res.status(200).render("index");
});

app.get("/services", (req: Request, res: Response) => {
  res.status(200).render("services");
});

app.get("/profile", (req: Request, res: Response) => {
  res.status(200).render("profile");
});

app.get("*", (req: Request, res: Response) => {
  res.status(301).redirect("/home");
});

const dbUSER = process.env.DB_USER;
const dbPASS = process.env.DB_PASS;
const dbHOST = process.env.DB_HOST;
const dbURL = `mongodb+srv://${dbUSER}:${dbPASS}@${dbHOST}`;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DATABASE IS ON!");
    app.listen(PORT, () => console.log("SERVER IS ON!"));
  })
  .catch((error) => console.log(error));
