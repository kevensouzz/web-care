import { Router } from "express";
import userController from "../controllers/user";

const userRouter = Router();

userRouter.post("/signup", userController.signup);

userRouter.post("/signin", userController.signin);

userRouter.get("/", userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.patch("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
