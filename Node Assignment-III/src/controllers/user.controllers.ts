import { Request, Response } from "express";
import * as UserService from "../services/user.services";

export function getUser(req: Request, res: Response) {
  const data = UserService.getUser();
  console.log(data);
  res.send(data);
}
