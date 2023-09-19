import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";

export default async function createUserToken(
  user: {
    username: string;
    password: string;
    _id: string;
  },
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
