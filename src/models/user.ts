import { Schema, model } from "mongoose";

interface User {
  username: string;
  password: string;
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
