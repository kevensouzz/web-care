import { Request, Router } from "express";
import { Response } from "express";

const viewsRouter = Router();

viewsRouter.get("/home", (req: Request, res: Response) => {
  res.status(200).render("index");
});

viewsRouter.get("/services", (req: Request, res: Response) => {
  res.status(200).render("services");
});

viewsRouter.get("/profile", (req: Request, res: Response) => {
  res.status(200).render("profile");
});

viewsRouter.get("/", (req: Request, res: Response) => {
  res.status(301).redirect("/home");
});

export default viewsRouter;
