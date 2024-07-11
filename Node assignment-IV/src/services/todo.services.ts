import * as TodoModel from "../models/todo.model";

import ITODO from "../interfaces/todo.interface";

import loggerWithaNameSpace from "../utils/logger";

const logger = loggerWithaNameSpace("TodoServices");

export function getTodos(userId: string) {
  logger.info("getTodos");
  const data = TodoModel.getTodos(userId);
  return data;
}

export function getTodoById(id: string, userId: string) {
  logger.info("getTodosById");
  const data = TodoModel.getTodosById(id, userId);

  if (!data) {
    return {
      error: "Error Retriving todo datas",
    };
  }
  return data;
}

export function createTodo(userId: string, todo: ITODO) {
  logger.info("createTodos");
  TodoModel.createTodo(userId, todo);
}

export function updateTodo(id: string, newTodo: ITODO, userId: string) {
  logger.info("updateTodo");
  return TodoModel.updateTodo(id, newTodo, userId);
}
export function deleteTodo(id: string, userId: string) {
  logger.info("deleteTodo");
  return TodoModel.deleteTodo(id, userId);
}
