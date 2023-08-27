import { Schema, model } from "mongoose";

const userModel = model(
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

export default userModel