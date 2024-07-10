import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { BadRequest } from "../error/BadRequest";
import * as UserService from "../services/user.services";

export function getUser(req: Request, res: Response) {
  const data = UserService.getUser();
  console.log(data);
  res.send(data);
}

export function createUser(req: Request, res: Response) {
  const userDetails = req.body;
  UserService.createUser(userDetails);
  return res.status(200).send("User Succesfully Signed Up");
}

export function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const newUserDetails = req.body;

  const data = UserService.updateUser(id, newUserDetails);
  res.status(HttpStatusCodes.OK).send({
    message: "Upated Succesfully",
    todos: data,
  });
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  console.log(id);
  const user = UserService.deleteUser(id);
  if (user === null) {
    next(new BadRequest(`User with id: ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).send(`User with id:${id} deleted`);
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  const user = UserService.getUserById(id);
  res.status(HttpStatusCodes.OK).send(user);
}
