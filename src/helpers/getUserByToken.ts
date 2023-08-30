import { JwtPayload, verify } from "jsonwebtoken";
import { userModel } from "../models/user";

export default async function getUserByToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const decoded = verify(token, "nossosecret") as JwtPayload;

  const userId = decoded.id;

  const user = await userModel.findOne({ _id: userId });

  return user;
}
