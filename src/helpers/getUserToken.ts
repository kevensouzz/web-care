import { Request } from "express";

export default function getUserToken(req: Request) {
  try {
    if (!req.headers.authorization) {
      return undefined;
    }

    return req.headers.authorization;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
