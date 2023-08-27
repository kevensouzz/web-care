import userModel from "../models/user";
import { Request, Response } from "express";

export default class userController {
  static async signup(req: Request, res: Response) {
    try {

      const { username, password, confirmPassword } = req.body;

      if (!username || !password || !confirmPassword) {
        return res.status(422).json("there are required fields no filled in!");
      }

      if (password != confirmPassword) {
        return res.status(422).json("password doesn't match confirmation!");
      }

      const users = await userModel.findOne({username: username})

      if (users) {
        return res.status(422).json("there is already a has user registred with this username!")
      }
      
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
