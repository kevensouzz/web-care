import { NextFunction, Request, Response } from "express";
import getUserToken from "./getUserToken";
import { verify, Secret, JwtPayload } from "jsonwebtoken";

export default function verifyUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getUserToken(req);

  if (!token) {
    return res.status(301).redirect("/signin");
  }

  const verified = verify(token, process.env.JWT_SECRET as Secret);
  (req as JwtPayload).user = verified;
  next();
}
