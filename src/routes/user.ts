import { NextFunction, Request, Response, Router } from "express";
import passport from "passport"
import { alreadyAuthenticated, ensureAuthenticated } from "./router";

const userRouter = Router();

userRouter.get("/auth", alreadyAuthenticated, passport.authenticate("google", { scope: ["profile", "email"] }))

userRouter.get("/auth/callback", alreadyAuthenticated, passport.authenticate("google", {
  successRedirect: "/profile",
  failureRedirect: "/",
  scope: ["profile", "email"]
}))

userRouter.get("/logout", ensureAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    req.logout((err) => {
      if (err) {
        return next(err);
      };

      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
})

export default userRouter;