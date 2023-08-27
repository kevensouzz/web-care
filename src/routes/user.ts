import { Request, Response, Router, request } from "express";
import userController from "../controllers/user";

const userRouter = Router();

userRouter
  .route("/signup")
  .post((req: Request, res: Response) => userController.signup(req, res));

userRouter
  .route("/signin")
  .post((req: Request, res: Response) => userController.signin(req, res));

export default userRouter;
