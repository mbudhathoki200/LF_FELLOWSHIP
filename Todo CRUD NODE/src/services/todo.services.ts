import * as TodoModel from "../models/todo.model";

import ITODO from "../interfaces/todo.interface";

export function getTodos() {
  const data = TodoModel.getTodos();
  if (!data) {
    return {
      error: "Error Retriving todo datas",
    };
  }
  return data;
}

export function getTodoById(id: string) {
  const data = TodoModel.getTodosById(id);
  if (!data) {
    return {
      error: "Error Retriving todo datas",
    };
  }
  return data;
}

export function createTodo(todo: ITODO) {
  TodoModel.createTodo(todo);
}

export function updateTodo(id: string, newTodo: ITODO) {
  return TodoModel.updateTodo(id, newTodo);
}
export function deleteTodo(id: string) {
  return TodoModel.deleteTodo(id);
}
