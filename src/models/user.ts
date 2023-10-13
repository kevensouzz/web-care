import { Document, Schema, model } from "mongoose";

interface User {
  google_id: string;
  email: string;
  username: string;
  name: string;
  picture: string
}

export interface UserDocument extends User, Document { }

const User = model<UserDocument>(
  "User",
  new Schema({
    google_id: String,
    email: String,
    username: String,
    name: String,
    picture: String
  })
);

export default User;
