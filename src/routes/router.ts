import { NextFunction, Request, Response, Router } from "express";
import viewsRouter from "./view";
import userRouter from "./user";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  res.status(302).redirect("/");
}

const router = Router();

router.use("/", viewsRouter);
router.use("/", userRouter);

router.get("*", (req: Request, res: Response) => {
  const acceptHeader = req.header("Accept");

  acceptHeader && acceptHeader.includes("text/html")
    ? res.status(404).render("404")
    : res.status(404).send("404!");
});

export default router;
