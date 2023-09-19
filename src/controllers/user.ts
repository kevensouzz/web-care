import userModel from "../models/user";
import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import createUserToken from "../helpers/createUserToken";
import getUserToken from "../helpers/getUserToken";
import getUserByToken from "../helpers/getUserByToken";

export default class userController {
  static async signup(req: Request, res: Response) {
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

    try {
      const salt = await genSalt(12);
      const passwordHash = await hash(password, salt);

      const createdUser = new userModel({
        username: username,
        password: passwordHash,
      });

      const newUser = await createdUser.save();

      return await createUserToken(newUser, res);
    } catch (error) {
      console.log(error);
    }
  }

  static async signin(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).json("there are required fields no filled in!");
    }

    const userExist = await userModel.findOne({ username: username });

    if (!userExist) {
      return res.status(404).json("there are required fields no filled in!");
    }

    try {
      const checkPass = await compare(password, userExist.password);

      if (!checkPass) {
        return res.status(422).json("invalid password!");
      }

      return await createUserToken(userExist, res);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    const users = await userModel.find({}, "-password");
    return res.status(200).json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await userModel.findById(id, "-password");

    if (!user) {
      return res.status(404).json("user not found!");
    }

    return res.status(200).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    const token = getUserToken(req);
    let user = await getUserByToken(token);

    const { username, password } = req.body;

    if (!user) {
      return res.status(401).json("user not authenticated!");
    }

    user = await userModel.findById(user.id);

    if (!user) {
      return res.status(404).json("user not found!");
    }

    const usedUsername = await userModel.findOne({ username: username });

    if (usedUsername) {
      return res.status(422).json("this username is already in use!");
    } else if (user.username == username) {
      return res.status(422).json("you are already using this username!");
    } else if (user.password == password) {
      return res
        .status(422)
        .json(
          "the password you are trying to use has already been used before!"
        );
    }

    if (
      username &&
      password &&
      username != user.username &&
      password != user.password
    ) {
      user.username = username;

      const salt = await genSalt(12);
      const newPassword = password;
      const passwordHash = await hash(newPassword, salt);

      user.password = passwordHash;
    } else if (username && username != user.username) {
      user.username = username;
    } else if (password && password != user.password) {
      const salt = await genSalt(12);
      const newPassword = password;
      const passwordHash = await hash(newPassword, salt);

      user.password = passwordHash;
    }

    await user.save();
    return res.status(200).json("successfully updated!");
  }

  static async deleteUser(req: Request, res: Response) {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json("user not found!");
    }

    const userDeleted = await userModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json(`${userDeleted?.username} has been successfully deleted!`);
  }
}
