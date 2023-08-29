import { userModel, UserDocument } from "../models/user";
import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import createUserToken from "../helpers/createUserToken";

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

      const newUser = await createdUser.save();

      return await createUserToken(newUser, res);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async signin(req: Request, res: Response) {
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

      return await createUserToken(userExist, res);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userModel.find({}, "-password");
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const user = await userModel.findById(id, "-password");

      if (!user) {
        return res.status(404).json("user not found!");
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const user = await userModel.findById(id);

      if (!user) {
        res.status(404).json("User not found!");
      }

      const userDeleted = await userModel.findByIdAndDelete(id);

      return res
        .status(200)
        .json(`${userDeleted?.username} has been successfully deleted!`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
