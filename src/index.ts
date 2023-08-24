import dotenv from "dotenv";
import path from "path";
import express, { Request, Response, NextFunction } from "express";

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
  res.render("index");
});

app.get("/services", (req: Request, res: Response) => {
  res.render("services");
});

app.get("/profile", (req: Request, res: Response) => {
  res.render("profile");
});

app.get("*", (req: Request, res: Response) => {
  res.redirect("/home");
});

app.listen(PORT, () => {
  console.log("SERVER IS ON!");
});
