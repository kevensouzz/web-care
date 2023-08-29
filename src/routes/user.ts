import { Request, Response, Router } from "express";
import userController from "../controllers/user";

const userRouter = Router();

userRouter
  .route("/signup")
  .post((req: Request, res: Response) => userController.signup(req, res));

userRouter
  .route("/signin")
  .post((req: Request, res: Response) => userController.signin(req, res));

userRouter
  .route("/")
  .get((req: Request, res: Response) => userController.getAllUsers(req, res));

userRouter
  .route("/:id")
  .get((req: Request, res: Response) => userController.getUserById(req, res));

export default userRouter;
