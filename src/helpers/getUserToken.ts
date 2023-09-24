import { Request } from "express";

export default function getUserToken(req: Request) {
  if (!req.headers.authorization) {
    return undefined;
  }

  return req.headers.authorization;
}
