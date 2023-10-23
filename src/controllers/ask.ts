import { Request, Response } from "express";
import Ask from "../models/ask";

export default class askController {
  static async newAsk(req: Request, res: Response) {
    try {
      const { email, subject, description } = req.body;

      const newAsk = new Ask({
        email: email,
        subject: subject,
        description: description,
      });

      await newAsk.save();
      return res.status(200).json("Ask created successfully");
    } catch (error) {
      return res.status(500).json("Error creating the ask!");
    }
  }

  static async getAllAsks(req: Request, res: Response) {
    try {
      const asks = await Ask.find();

      if (asks.length > 0) {
        return res.status(200).json(asks);
      } else {
        return res.status(404).json("There are no asks!");
      }
    } catch (error) {
      return res.status(500).json("Error retrieving asks!");
    }
  }

  static async getAskById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const ask = await Ask.findById(id);

      if (ask) {
        return res.status(200).json(ask);
      } else {
        return res.status(404).json("Ask not found!");
      }
    } catch (error) {
      return res.status(500).json("Error retrieving asks!");
    }
  }

  static async getAskPageById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const ask = await Ask.findById(id);

      if (ask) {
        return res.status(200).render("ask", { currentPage: "Services", user: req.user || undefined, ask });
      } else {
        return res.status(404).json("Ask not found!");
      }
    } catch (error) {
      return res.status(500).json("Error retrieving the ask!");
    }
  }

  static async newAskAnswer(req: Request, res: Response) {

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

  static async deleteAsk(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deletedAsk = await Ask.findByIdAndDelete(id);

      if (deletedAsk) {
        return res.status(200).json(`${deletedAsk?.subject} has been successfully deleted!`)
      } else {
        return res.status(404).json("Ask not found!");
      }
    } catch (error) {
      return res.status(500).json("Error deleting the answer!")
    }
  }
}