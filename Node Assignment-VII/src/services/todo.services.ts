import * as TodoModel from "../models/todo.model";

import ITODO from "../interfaces/todo.interface";

import loggerWithaNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequest } from "../error/BadRequest";
import { log } from "console";
import { notFoundError } from "../middlewares/errorHandler.middleware";

const logger = loggerWithaNameSpace("TodoServices");

export async function getTodos(userId: string) {
  logger.info("getTodos");
  const data = await TodoModel.TodoModel.getTodos(userId);

  return data;
}

export async function getTodoById(id: string, userId: string) {
  logger.info("getTodosById");
  const data = await TodoModel.TodoModel.getTodosById(id, userId);

  if (data.length == 0) {
    throw new NotFoundError(`Todo with the id: ${id} doesnot exist`);
  }
  return data;
}

export async function createTodo(userId: string, todo: ITODO) {
  logger.info("createTodos");
  return await TodoModel.TodoModel.createTodo(userId, todo);
}

export async function updateTodo(
  todoId: string,
  newTodo: ITODO,
  userId: string
) {
  logger.info("updateTodo");

  const existingTodo = await TodoModel.TodoModel.getTodosById(todoId, userId);
  console.log(existingTodo);

  if (existingTodo.length == 0) {
    throw new NotFoundError(`Todo with id: ${todoId} not found`);
  }

  return await TodoModel.TodoModel.updateTodo(todoId, newTodo, userId);
}
export async function deleteTodo(id: string, userId: string) {
  logger.info("deleteTodo");
  const data = await TodoModel.TodoModel.getTodosById(id, userId);

  console.log({ data });
  if (data.length == 0) {
    throw new NotFoundError(`Todo with id: ${id} not found`);
  }

  TodoModel.TodoModel.deleteTodo(id);
}
