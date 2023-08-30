import { NextFunction, Request, Response } from "express";
import getUserToken from "./getUserToken";
import { verify, Secret } from "jsonwebtoken";

interface UserRequest extends Request {
  user: {};
}

export default function verifyUserToken(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.status(401).json("access danied!");
  }

  const token = getUserToken(req);

  if (!token) {
    return res.status(401).json("access danied!");
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json("JWT secret not configured.");
  }

  try {
    const verified = verify(token, process.env.JWT_SECRET as Secret);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json(["invalid token!", error]);
  }
}
