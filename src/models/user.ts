import { Document, Schema, model } from "mongoose";

interface User {
  username: string;
  password: string;
}

export interface UserDocument extends User, Document {}

const userModel = model<UserDocument>(
  "User",
  new Schema({
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

export default userModel;
