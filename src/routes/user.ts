import { Router } from "express";
import userController from "../controllers/user";

const userRouter = Router()

userRouter
  .route("/signup")
  .post((req, res) => userController.signup(req, res))

export default userRouter