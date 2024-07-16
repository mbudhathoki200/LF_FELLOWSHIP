import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import { getTodosById } from "../models/todo.model";
import * as todoServices from "../services/todo.services";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

const logger = loggerWithNameSpace("TodoController");

export function getTodo(req: Request, res: Response, next: NextFunction) {
  logger.info("get todo");
  const userId = req.user?.id;

  const data = todoServices.getTodos(userId!);

  if (data.length == 0) {
    next(new NotFoundError("No todos Exists"));
    return;
  }
  return res.status(HttpStatusCodes.OK).send(data);
}
export function getTodoById(req: Request, res: Response, next: NextFunction) {
  logger.info("get todo by id");
  const userId = req.user?.id!;
  const { id } = req.params;
  const data = getTodosById(id, userId);
  if (!data) {
    next(new UnauthenticatedError("Unauthorized"));
    return;
  }
  return res.status(HttpStatusCodes.OK).send({
    todo: data,
  });
}

export function createTodo(req: Request, res: Response) {
  logger.info("create todo");
  const userId = req.user?.id;
  const todo = req.body;
  todoServices.createTodo(userId!, todo);
  res.status(HttpStatusCodes.OK).send({
    message: "Todo Succesfully Created",
  });
}

export function updateTodo(req: Request, res: Response, next: NextFunction) {
  logger.info("udpate todo");
  const userId = req.user?.id!;
  const { id } = req.params;
  const newTodo = req.body;
  const data = todoServices.updateTodo(id, newTodo, userId);

  if (!data) {
    next(new UnauthenticatedError("Unauthorized"));
    return;
  }
  res.status(HttpStatusCodes.OK).send({
    message: "Upated Succesfully",
    todos: data,
  });
}

export function deleteTodo(req: Request, res: Response, next: NextFunction) {
  logger.info("delete todo");
  const { id } = req.params;
  const userId = req.user?.id;
  const data = todoServices.deleteTodo(id, userId!);

  if (data === null) {
    next(new NotFoundError(`Todo with id: ${id} doesnt exist`));
    return;
  }
  res.status(HttpStatusCodes.OK).send({
    message: `Todo with id: ${id} deleted succesfully`,
  });
}
