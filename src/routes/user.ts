import { Router } from "express";
import userController from "../controllers/user";

const userRouter = Router();

userRouter.post("/signup", userController.signup);

userRouter.post("/signin", userController.signin);

userRouter.get("/", userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

export default userRouter;
