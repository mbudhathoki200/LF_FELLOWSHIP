import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }
  try {
    const payload = verify(token[1], config.jwt.secret!);
  } catch (error) {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }

  next();
}
