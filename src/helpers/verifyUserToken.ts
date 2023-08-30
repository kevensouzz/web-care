import { NextFunction, Request, Response } from "express";
import getUserToken from "./getUserToken";
import { verify } from "jsonwebtoken";

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

  try {
    const verified = verify(token, "nossosecret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json(["invalid token!", error]);
  }
}
