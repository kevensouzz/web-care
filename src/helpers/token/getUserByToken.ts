import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { userModel } from "../../models/user";
import ApiError from "../error/apiErrors";

export default async function getUserByToken(token: string | undefined) {
  const secret = process.env.JWT_SECRET;

  if (!token) {
    throw new ApiError("token not found!", 204);
  }

  const decoded = verify(token, secret as Secret);
  const userId = (decoded as JwtPayload).id;
  const user = await userModel.findOne({ _id: userId });

  return user;
}
