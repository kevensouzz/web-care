import { Request, response } from "express";

export default function getUserToken(req: Request) {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return response
        .status(204)
        .json("missing authorization header in request!");
    }

    const parts = authHeaders.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return response.status(422).json("invalid authorization header format!");
    }

    const token = parts[1];
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
}
