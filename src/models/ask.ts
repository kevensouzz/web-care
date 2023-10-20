import { Document, Schema, model } from "mongoose";

interface Ask {
  email: string;
  subject: string;
  description: string;
}

export interface AskDocument extends Ask, Document {}

const Ask = model<AskDocument>(
  "Ask",
  new Schema({
    email: String,
    subject: String,
    description: String
  })
);

export default Ask;
