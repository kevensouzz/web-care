import { Request } from "express";

export default function getUserToken(req: Request) {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      throw new Error("Cabeçalho de autorização ausente na solicitação.");
    }

    const parts = authHeaders.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new Error("Formato de cabeçalho de autorização inválido.");
    }

    const token = parts[1];
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
}
