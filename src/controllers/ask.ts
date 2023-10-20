import { Request, Response } from "express";
import Ask from "../models/ask"

export default class askController {
  static async newAsk(req: Request, res: Response) {
    const { email, subject, description } = req.body;

    new Ask({
      email: email,
      subject: subject,
      description: description,
    }).save()
  }
}