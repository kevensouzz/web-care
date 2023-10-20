import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./router";
import askRouter from "./ask";

const serviceViewRouter = Router();

serviceViewRouter.get("/", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("services", { currentPage: "Services", user: req.user || undefined });
});

serviceViewRouter.get("/faqs", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("faqs", { currentPage: "Services", user: req.user || undefined });
});

serviceViewRouter.use("/faqs", askRouter);

export default serviceViewRouter;