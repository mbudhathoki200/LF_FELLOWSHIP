import { Request } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

let payload;
export function getUserDetails(req: Request) {
  const { authorization } = req.headers;
  if (!authorization) {
    return new Error("Unauthenticated");
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    return new Error("Unauthenticated");
  }

  try {
    payload = verify(token[1], config.jwt.secret!);
  } catch (error) {
    return {
      error: "Unauthorized token",
    };
  }
  if (typeof payload === "string") {
    return;
  }
  return payload.id;
}
