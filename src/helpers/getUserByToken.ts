import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { userModel } from "../models/user";

export default async function getUserByToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const decoded = verify(token, process.env.JWT_SECRET as Secret);

  if (typeof decoded === "object" && "id" in decoded) {
    const userId = (decoded as JwtPayload).id;

    const user = await userModel.findOne({ _id: userId });

    return user;
  }

  return null;
}
