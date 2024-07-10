import { Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import { getTodosById } from "../models/todo.model";
import * as todoServices from "../services/todo.services";

export function getTodo(req: Request, res: Response) {
  const userId = req.user?.id;

  const data = todoServices.getTodos(userId!);

  if (!data) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ message: "Unable to retrive todo" });
  }
  res.status(HttpStatusCodes.OK).send(data);
}
export function getTodoById(req: Request, res: Response) {
  const userId = req.user?.id;
  const { id } = req.params;
  const data = getTodosById(id, userId!);
  if (!data) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "Unauthorized" });
  }
  res.status(HttpStatusCodes.OK).send({
    todo: data,
  });
}

export function createTodo(req: Request, res: Response) {
  const userId = req.user?.id;
  const todo = req.body;
  todoServices.createTodo(userId!, todo);
  res.status(HttpStatusCodes.OK).send({
    message: "Todo Succesfully Created",
  });
}

export function updateTodo(req: Request, res: Response) {
  const userId = req.user?.id;
  const { id } = req.params;
  const newTodo = req.body;
  const data = todoServices.updateTodo(id, newTodo, userId!);

  if (!data) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "Unauthorized" });
  }
  res.status(HttpStatusCodes.OK).send({
    message: "Upated Succesfully",
    todos: data,
  });
}

export function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.id;
  const errorMessage = todoServices.deleteTodo(id, userId!);

  if (errorMessage) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({
      errorMessage,
    });
  }
  res.status(HttpStatusCodes.OK).send({
    message: `Todo with id: ${id} deleted succesfully`,
  });
}
