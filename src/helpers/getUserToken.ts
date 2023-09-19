import { Request } from "express";

export default function getUserToken(req: Request) {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return undefined;
    }

    const parts = authHeaders.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return undefined;
    }

    const token = parts[1];
    return token;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
