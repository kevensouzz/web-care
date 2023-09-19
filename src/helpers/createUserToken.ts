import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { User } from "../models/user";

export default async function createUserToken(
  user: User,
  res: Response
) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json("JWT secret not configured!");
  }

  const token = sign(
    {
      id: user._id,
    },
    secret as Secret,
    {
      expiresIn: "8h",
    }
  );

  return res.status(200).json(["success!", { token: token }]);
}
