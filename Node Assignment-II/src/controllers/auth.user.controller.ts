import { Request, Response } from "express";
import * as AuthServices from "../services/auth.user.services";

export function logIn(req: Request, res: Response) {
  const { body } = req;
  const data = AuthServices.logIn(body);
  res.send(data);
}
