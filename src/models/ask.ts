import { Document, Schema, model } from "mongoose";

interface Answer {
  email: string;
  answer: string;
}
interface Ask {
  email: string;
  subject: string;
  description: string;
  answers?: Answer[];
}

export interface AnswerDocument extends Answer, Document { };

const answerSchema = new Schema<AnswerDocument>({
  email: String,
  answer: String
});

export interface AskDocument extends Ask, Document { };

const Ask = model<AskDocument>(
  "Ask",
  new Schema({
    email: String,
    subject: String,
    description: String,
    answers: [answerSchema]
  })
);

export default Ask;
