import userModel from "../models/user";
import { Request, Response } from "express";
import { genSalt, hash } from "bcrypt";

export default class userController {
  static async signup(req: Request, res: Response) {
    try {
      const { username, password, confirmPassword } = req.body;

      if (!username || !password || !confirmPassword) {
        res.status(422).json("there are required fields no filled in!");
      }

      if (password != confirmPassword) {
        res.status(422).json("password doesn't match confirmation!");
      }

      const users = await userModel.findOne({ username: username });

      if (users) {
        res
          .status(422)
          .json("there is already a has user registred with this username!");
      }

      const salt = await genSalt(12);
      const passwordHash = await hash(password, salt);

      const user = new userModel({
        username: username,
        password: passwordHash,
      });

      const response = await userModel.create(user);

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
