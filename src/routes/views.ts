import { Router } from "express";
import { Response } from "express";

const viewsRouter = Router();

viewsRouter.get("/home", (res: Response) => {
  res.status(200).render("index");
});

viewsRouter.get("/services", (res: Response) => {
  res.status(200).render("services");
});

viewsRouter.get("/profile", (res: Response) => {
  res.status(200).render("profile");
});

viewsRouter.get("/", (res: Response) => {
  res.status(301).redirect("/home");
});

export default viewsRouter;
