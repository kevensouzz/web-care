import { Router } from "express";
import userRouter from "./user";
import viewsRouter from "./views";

const router = Router()

router.use("/", viewsRouter)

router.use("/users", userRouter)

export default router