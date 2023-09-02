import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { userModel } from "../../models/user"

export default async function getUserByToken(token: string | undefined) {
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return null;
  }

  const decoded = verify(token, secret as Secret);
  const userId = (decoded as JwtPayload).id;
  const user = await userModel.findOne({ _id: userId });

  return user;
}
