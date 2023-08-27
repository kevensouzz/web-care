import { userModel, UserDocument } from "../models/user";
import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";

interface SignupRequest extends Request {
  body: {
    username: string;
    password: string;
    confirmPassword: string;
  };
}

interface SigninRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

export default class userController {
  static async signup(req: SignupRequest, res: Response) {
    try {
      const { username, password, confirmPassword } = req.body;

      if (!username || !password || !confirmPassword) {
        return res.status(422).json("there are required fields no filled in!");
      }

      if (password != confirmPassword) {
        return res.status(422).json("password doesn't match confirmation!");
      }

      const userExist = await userModel.findOne({ username: username });

      if (userExist) {
        return res
          .status(422)
          .json("there is already a has user registred with this username!");
      }

      const salt = await genSalt(12);
      const passwordHash = await hash(password, salt);

      const createdUser: UserDocument = new userModel({
        username: username,
        password: passwordHash,
      });

      const response = await userModel.create(createdUser);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async signin(req: SigninRequest, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(422).json("there are required fields no filled in!");
      }

      const userExist = await userModel.findOne({ username: username });

      if (!userExist) {
        return res
          .status(404)
          .json("there isn't user registered with this username!");
      }

      const checkPass = await compare(password, userExist.password);

      if (!checkPass) {
        return res.status(422).json("invalid password!");
      }

      return res
        .status(200)
        .json(`${userExist.username} has successfully authorized!`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
