import { Request } from "express";

export default function getUserToken(req: Request) {
  const authHeaders = req.headers.authorization;
  
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    return token;
  }

  return;
}
