import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Error("Unauthenticated"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthenticated"));
    return;
  }

  const payload = verify(token[1], config.jwt.secret!);

  next();
}
