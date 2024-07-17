import * as TodoModel from "../models/todo.model";

import ITODO from "../interfaces/todo.interface";

import loggerWithaNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequest } from "../error/BadRequest";

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
    throw new BadRequest("Todo not found or user not authorized");
  }

  return await TodoModel.TodoModel.updateTodo(todoId, newTodo, userId);
}
export function deleteTodo(id: string, userId: string) {
  logger.info("deleteTodo");
  const data = TodoModel.getTodosById(id, userId);
  if (!data) {
    return null;
  }

  TodoModel.deleteTodo(id, userId);
}
