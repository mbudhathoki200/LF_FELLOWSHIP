import { Request, Response } from "express";
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

  const data = UserService.updateTodo(id, newUserDetails);
  res.status(200).send({
    message: "Upated Succesfully",
    todos: data,
  });
}

export function deleteUser(req: Request, res: Response) {}
