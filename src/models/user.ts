import { Document, Schema, model } from "mongoose";

interface User {
  google_id: string;
  email: string;
  name: string;
  picture: string;
  locale: string;
}

export interface UserDocument extends User, Document { }

const User = model<UserDocument>(
  "User",
  new Schema({
    google_id: String,
    email: String,
    name: String,
    picture: String,
    locale: String,
  })
);

export default User;
