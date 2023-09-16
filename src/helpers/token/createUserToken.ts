import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { UserDocument } from "../../models/user";
import ApiError from "../error/apiErrors";

export default async function createUserToken(
  user: UserDocument,
  res: Response
) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new ApiError("JWT secret not configured!", 500);
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
