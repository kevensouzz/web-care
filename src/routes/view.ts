import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./router";
import serviceViewRouter from "./service";

const viewRouter = Router();

viewRouter.get("/", (req: Request, res: Response) => {
  return res.status(302).redirect("/home");
});

viewRouter.get("/home", (req: Request, res: Response) => {
  return res.status(200).render("home", { currentPage: "Home", user: req.user || undefined });
});

viewRouter.use("/services", serviceViewRouter);

viewRouter.get("/contact", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("contact", { currentPage: "Contact", user: req.user || undefined });
});

viewRouter.get("/profile", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("profile", { currentPage: "Profile", user: req.user || undefined });
});

export default viewRouter;
