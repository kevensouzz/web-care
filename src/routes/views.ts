import { Router } from "express";
import { Request, Response } from "express";

const viewsRouter = Router();

viewsRouter.route("/home").get((req: Request, res: Response) => {
  res.status(200).render("index");
});

viewsRouter.route("/services").get((req: Request, res: Response) => {
  res.status(200).render("services");
});

viewsRouter.route("/profile").get((req: Request, res: Response) => {
  res.status(200).render("profile");
});

viewsRouter.route("/").get((req: Request, res: Response) => {
  res.status(301).redirect("/home");
});

export default viewsRouter;
