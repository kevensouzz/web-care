import { JwtPayload, Secret, verify } from "jsonwebtoken";
import userModel from "../models/user";
import { response } from "express";

export default async function getUserByToken(token: string | undefined) {
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return response.status(204).json("token not found!")
  }

  const decoded = verify(token, secret as Secret);
  const userId = (decoded as JwtPayload).id;
  const user = await userModel.findOne({ _id: userId });

  return user;
}
