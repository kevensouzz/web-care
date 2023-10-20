import { NextFunction, Request, Response, Router } from "express";
import viewRouter from "./view";
import userRouter from "./user";
import emailRouter from "./email";

export function alreadyAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return next();
  }
  return res.status(302).redirect("/");
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  return res.status(302).redirect("/");
}

const router = Router();

router.use("/", viewRouter);
router.use("/", userRouter);
router.use("/email", emailRouter);

router.get("*", (req: Request, res: Response) => {
  const acceptHeader = req.header("Accept");

  acceptHeader && acceptHeader.includes("text/html")
    ? res.status(404).render("404", { currentPage: "404", user: req.user || undefined })
    : res.status(404).send("404!");
});

export default router;
