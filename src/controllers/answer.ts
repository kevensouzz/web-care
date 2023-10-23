import { Request, Response } from "express";
import Ask from "../models/ask";

export default class answerController {
  static async newAnswer(req: Request, res: Response) {

    try {
      const id = req.params.id;
      const { email, answer } = req.body;
      const newAnswer = { email, answer };

      const pushedAsk = await Ask.findByIdAndUpdate(id,
        {
          $push: {
            answers:
              { email: newAnswer.email, answer: newAnswer.answer }
          },
        },
        { new: true }
      );

      return res.status(200).json(pushedAsk)
    } catch (error) {
      return res.status(500).json("Error retrieving the answer!")
    }
  }
}