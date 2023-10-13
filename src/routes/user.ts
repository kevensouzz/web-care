import { NextFunction, Request, Response, Router } from "express";
import passport from "passport"

const userRouter = Router();

userRouter.get("/auth", passport.authenticate("google", { scope: ["profile", "email"] }))

userRouter.get("/auth/callback", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/",
  scope: ["profile", "email"]
}))

userRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
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