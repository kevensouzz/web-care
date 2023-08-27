import { Schema, model, Document } from "mongoose";

interface User {
  username: string;
  password: string;
}

interface UserDocument extends User, Document {}

const userModel = model<UserDocument>(
  "User",
  new Schema<User>({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

export { userModel, UserDocument };
