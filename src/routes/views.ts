import { Request, Response, Router } from "express";
import verifyUserToken from "../helpers/verifyUserToken";

const viewsRouter = Router();

viewsRouter.get("/home", (req: Request, res: Response) => {
  return res.status(200).render("index");
});

viewsRouter.get("/", (req: Request, res: Response) => {
  return res.status(301).redirect("/home");
});

viewsRouter.get("/services", verifyUserToken, (req: Request, res: Response) => {
  return res.status(200).render("services");
});

viewsRouter.get("/servicos", (req: Request, res: Response) => {
  return res.status(301).redirect("/services");
});

viewsRouter.get("/profile", verifyUserToken, (req: Request, res: Response) => {
  return res.status(200).render("profile");
});

viewsRouter.get(["/perfil", "/account", "/conta"], (req, res) => {
  return res.status(301).redirect("/profile");
});

viewsRouter.get("/signin", (req: Request, res: Response) => {
  return res.status(200).render("signin");
});

viewsRouter.get(["/login", "/entrar"], (req, res) => {
  return res.status(301).redirect("/signin");
});

viewsRouter.get("/signup", (req: Request, res: Response) => {
  return res.status(200).render("signup");
});

viewsRouter.get(["/logup", "/cadastrar"], (req, res) => {
  return res.status(301).redirect("/signup");
});

export default viewsRouter;
