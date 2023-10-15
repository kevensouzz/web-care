import { Router } from "express";
import { ensureAuthenticated } from "./router";
import emailController from "../controllers/email";

const emailRouter = Router();

 emailRouter.post("/send", ensureAuthenticated, emailController.sendEmail)

export default emailRouter;