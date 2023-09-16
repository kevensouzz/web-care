import { Request, Response, Router } from "express";
import verifyUserToken from "../helpers/token/verifyUserToken";

const viewsRouter = Router();

viewsRouter.get("/home", (req: Request, res: Response) => {
  return res.status(200).render("index");
});

viewsRouter.get("/services", verifyUserToken, (req: Request, res: Response) => {
  return res.status(200).render("services");
});

viewsRouter.get("/profile", verifyUserToken, (req: Request, res: Response) => {
  return res.status(200).render("profile");
});

viewsRouter.get("/signin", (req: Request, res: Response) => {
  return res.status(200).render("signin");
});

viewsRouter.get("/signup", (req: Request, res: Response) => {
  return res.status(200).render("signup");
});

viewsRouter.get("/", (req: Request, res: Response) => {
  return res.status(301).redirect("/home");
});

export default viewsRouter;
