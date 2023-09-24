import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { UserDocument } from "../models/user";

export default async function createUserToken(
  user: UserDocument,
  res: Response
) {
  const token = sign({ id: user._id }, process.env.JWT_SECRET as Secret);
  return res.status(200).json(token);
}
