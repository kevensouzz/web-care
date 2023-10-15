import { Document, Schema, model } from "mongoose";

interface Email {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailDocument extends Email, Document {}

const Email = model<EmailDocument>(
  "Email",
  new Schema({
    name: String,
    email: String,
    subject: String,
    message: String
  })
);

export default Email;
