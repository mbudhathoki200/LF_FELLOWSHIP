import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import * as AuthServices from "../services/auth.user.services";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthController");
export function logIn(req: Request, res: Response) {
  logger.info("login");
  const { body } = req;
  const data = AuthServices.logIn(body);
  return res.status(HttpStatusCodes.OK).send(data);
}

export function signUp(req: Request, res: Response) {
  logger.info("sign up");
  const userDetails = req.body;
  AuthServices.signUp(userDetails);
  return res.status(HttpStatusCodes.OK).send("User Succesfully Signed Up");
}

export function refreshToken(req: Request, res: Response) {
  logger.info("refresh token");
  const { body } = req;
  const data = AuthServices.refreshToken(body.refreshToken);
  return res.status(HttpStatusCodes.OK).send(data);
}
