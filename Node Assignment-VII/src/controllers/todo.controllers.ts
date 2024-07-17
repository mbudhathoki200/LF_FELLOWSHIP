import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { Request } from "../interfaces/auth.interface";
import * as TodoServices from "../services/todo.services";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TodoController");

export async function getTodo(req: Request, res: Response, next: NextFunction) {
  logger.info("get todo");
  const userId = req.user?.id;

  const data = await TodoServices.getTodos(userId!);

  if (data.length == 0) {
    next(new NotFoundError("No todos Exists"));
    return;
  }

  return res.status(HttpStatusCodes.OK).send(data);
}
export async function getTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get todo by id");
  const userId = req.user?.id!;
  const { id } = req.params;
  try {
    const data = await TodoServices.getTodoById(id, userId);
    if (!data) {
      next(new UnauthenticatedError("Unauthorized"));
      return;
    }
    return res.status(HttpStatusCodes.OK).send({
      todo: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTodo(req: Request, res: Response) {
  logger.info("create todo");
  const userId = req.user?.id;
  const todo = req.body;

  const data = await TodoServices.createTodo(userId!, todo);

  res.status(HttpStatusCodes.OK).send({
    message: "Todo Succesfully Created",
    todo: data,
  });
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("udpate todo");
  const userId = req.user?.id!;
  const { id } = req.params;
  const newTodo = req.body;
  try {
    const data = await TodoServices.updateTodo(id, newTodo, userId);

    res.status(HttpStatusCodes.OK).send({
      message: "Upated Succesfully",
      todos: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("delete todo");
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    const data = await TodoServices.deleteTodo(id, userId!);
    res.status(HttpStatusCodes.OK).send({
      message: `Todo with id: ${id} deleted succesfully`,
    });
  } catch (error) {
    next(error);
  }
}
