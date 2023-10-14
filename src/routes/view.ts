import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./router";

const viewsRouter = Router();

viewsRouter.get("/", (req: Request, res: Response) => {
  return res.status(302).redirect("/home");
});

viewsRouter.get("/home", (req: Request, res: Response) => {
  return res.status(200).render("home", { currentPage: "Home", user: req.user || undefined });
});

viewsRouter.get("/services", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("services", { currentPage: "Services", user: req.user || undefined });
});

viewsRouter.get("/profile", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("profile", { currentPage: "Profile", user: req.user || undefined });
});

export default viewsRouter;
