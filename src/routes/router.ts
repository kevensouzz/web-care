import { Request, Response, Router } from "express";
import userRouter from "./user";
import viewsRouter from "./views";

const router = Router();

router.use("/", viewsRouter);

router.use("/users", userRouter);

router.route("*").get((req: Request, res: Response) => {
  const acceptHeader = req.header("Accept");

  acceptHeader && acceptHeader.includes("text/html")
    ? res.status(404).render("404")
    : res.status(404).send("404 ):");
});

export default router;
