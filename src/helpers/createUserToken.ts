import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { UserDocument } from "../models/user";

export default async function createUserToken(
  user: UserDocument,
  res: Response
) {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json("JWT secret not configured");
    }

    const token = sign(
      {
        id: user._id,
      },
      secret as Secret
    );

    return res.status(200).json(["success!", { token: token }]);
  } catch (error) {
    return res.status(500).json(error);
  }
}
