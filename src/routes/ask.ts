import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./router";
import askController from "../controllers/ask";

const askRouter = Router();

askRouter.get("/new-ask", ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).render("new-ask", { currentPage: "Services", user: req.user || undefined });
});

askRouter.post("/new-ask", ensureAuthenticated, askController.newAsk);

askRouter.get("/asks", ensureAuthenticated, askController.getAllAsks);

askRouter.get("/askPage/:id", ensureAuthenticated, askController.getAskPageById);

askRouter.get("/ask/:id", ensureAuthenticated, askController.getAskById);

askRouter.delete("/ask/:id", ensureAuthenticated, askController.deleteAsk);

askRouter.patch("/ask/:id", ensureAuthenticated, askController.newAskAnswer)

export default askRouter;