import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./router";
import askController from "../controllers/ask";

const askRouter = Router();

askRouter.get("/new-ask", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("new-ask", { currentPage: "Services", user: req.user || undefined });
});

askRouter.post("/new-ask", ensureAuthenticated, askController.newAsk);

export default askRouter;