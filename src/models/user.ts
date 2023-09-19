import { Schema, model, Document } from "mongoose";

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
    _id: {
      type: String,
      require: false,
    },
  })
);

export default userModel;
