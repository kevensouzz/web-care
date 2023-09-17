import { NextFunction, Request, Response } from "express";
import getUserToken from "./getUserToken";
import { verify, Secret, JwtPayload } from "jsonwebtoken";

export default function verifyUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secret = process.env.JWT_SECRET;
  const token = getUserToken(req);

  if (!req.headers.authorization) {
    return res.status(301).redirect("/signin");
  } else if (!token) {
    return res.status(301).redirect("/signin");
  } else if (!secret) {
    return res.status(500).json("JWT secret not configured!");
  }

  try {
    const verified = verify(token, secret as Secret);
    (req as JwtPayload).user = verified;
    next();
  } catch (error) {
    return res.status(400).json(["invalid token!", error]);
  }
}
