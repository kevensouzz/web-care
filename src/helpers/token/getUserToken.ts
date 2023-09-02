import { Request } from "express";
import { ApiError } from "../error/apiErrors";

export default function getUserToken(req: Request) {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      throw new ApiError("missing authorization header in request!", 204);
    }

    const parts = authHeaders.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new ApiError("invalid authorization header format!", 422);
    }

    const token = parts[1];
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
}
