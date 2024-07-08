import { Request, Response } from "express";
import * as todoServices from "../services/todo.services";
import { getTodosById } from "../models/todo.model";

export function getTodo(req: Request, res: Response) {
  const data = todoServices.getTodos();
  console.log(data);
  res.status(200).send(data);
}
export function getTodoById(req: Request, res: Response) {
  const { id } = req.params;
  console.log(req.params);
  const data = getTodosById(id);
  res.status(200).send(data);
}

export function createTodo(req: Request, res: Response) {
  const { todo } = req.body;
  todoServices.createTodo(todo);
  res.status(200).send({
    message: "Todo Succesfully Created",
  });
}

export function updateTodo(req: Request, res: Response) {
  const { id } = req.params;
  const newTodo = req.body;
  const data = todoServices.updateTodo(id, newTodo);
  res.status(200).send({
    message: "Upated Succesfully",
    data: data,
  });
}

export function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;
  const todos = todoServices.deleteTodo(id);
  res.status(200).send({
    message: `Todo with id: ${id} deleted succesfully`,
    todos: todos,
  });
}
