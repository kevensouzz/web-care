import { userModel, UserDocument } from "../models/user";
import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import createUserToken from "../helpers/token/createUserToken";
import getUserToken from "../helpers/token/getUserToken";
import getUserByToken from "../helpers/token/getUserByToken";
import ApiError from "../helpers/error/apiErrors";

export default class userController {
  static async signup(req: Request, res: Response) {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      throw new ApiError("there are required fields no filled in!", 422);
    }

    if (password != confirmPassword) {
      throw new ApiError("password doesn't match confirmation!", 422);
    }

    const userExist = await userModel.findOne({ username: username });

    if (userExist) {
      throw new ApiError(
        "there is already a has user registred with this username!",
        422
      );
    }

    const salt = await genSalt(12);
    const passwordHash = await hash(password, salt);

    const createdUser: UserDocument = new userModel({
      username: username,
      password: passwordHash,
    });

    const newUser = await createdUser.save();

    return await createUserToken(newUser, res);
  }

  static async signin(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError("there are required fields no filled in!", 422);
    }

    const userExist = await userModel.findOne({ username: username });

    if (!userExist) {
      throw new ApiError(
        "there isn't user registered with this username!",
        404
      );
    }

    const checkPass = await compare(password, userExist.password);

    if (!checkPass) {
      throw new ApiError("invalid password!", 422);
    }

    return await createUserToken(userExist, res);
  }

  static async getAllUsers(req: Request, res: Response) {
    const users = await userModel.find({}, "-password");
    return res.status(200).json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await userModel.findById(id, "-password");

    if (!user) {
      throw new ApiError("user not found!", 404);
    }

    return res.status(200).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    const token = getUserToken(req);
    let user = await getUserByToken(token);

    const { username, password } = req.body;

    if (!user) {
      throw new ApiError("User not authenticated!", 401);
    }

    user = await userModel.findById(user.id);

    if (!user) {
      throw new ApiError("user not found!", 404);
    }

    const usedUsername = await userModel.findOne({ username: username });

    if (usedUsername) {
      throw new ApiError("this username is already in use!", 422);
    } else if (user.username == username) {
      throw new ApiError("you are already using this username!", 422);
    } else if (user.password == password) {
      throw new ApiError(
        "the password you are trying to use has already been used before!",
        422
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
      throw new ApiError("user not found!", 404);
    }

    const userDeleted = await userModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json(`${userDeleted?.username} has been successfully deleted!`);
  }
}
