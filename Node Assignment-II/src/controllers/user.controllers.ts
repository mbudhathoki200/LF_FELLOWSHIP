import { Request, Response } from "express";
import * as UserService from "../services/user.services";

export function signUp(req: Request, res: Response) {
  const userDetails = req.body;
  UserService.signUp(userDetails);
  return res.status(200).send("User Succesfully Signed Up");
}

export function getUser(req: Request, res: Response) {
  const data = UserService.getUser();
  console.log(data);
  res.send(data);
}
