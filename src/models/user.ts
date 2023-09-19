import { Schema, model, Document } from "mongoose";

export interface User {
  username: string;
  password: string;
  _id?: string;
}

const userModel = model(
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

export default userModel;
