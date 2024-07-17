import ITODO from "../interfaces/todo.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base.model";

const logger = loggerWithNameSpace("TodoModel");

let todos = [
  {
    id: "1",
    title: "CODE",
    description: "CODE CODE CODE",
    userId: "1",
  },
  {
    id: "2",
    title: "COOK",
    description: "COOK COOK COOK",
    userId: "2",
  },
  {
    id: "3",
    title: "PLAY",
    description: "FOOTBALL",
    userId: "1",
  },
  {
    id: "4",
    title: "ASSIGNMENT",
    description: "Do Assignment",
    userId: "2",
  },
];

export class TodoModel extends BaseModel {
  static getTodos(userId: string) {
    const todo = this.queryBuilder()
      .select(
        "todos.id",
        "todos.title",
        "todos.description",
        "todos.userId",
        "todos.created_at"
      )
      .table("todos")
      .where("userId", userId);

    return todo;
  }
  static async getTodosById(todoId: string, ownerId: string) {
    const todos = this.queryBuilder()
      .select(
        "todos.id",
        "todos.title",
        "todos.description",
        "todos.userId",
        "todos.created_at"
      )
      .table("todos")
      .where({ id: todoId, userId: ownerId });
    return await todos;
  }

  static async createTodo(ownerId: string, todo: ITODO) {
    const todoToCreate = {
      title: todo.title,
      description: todo.description,
      userId: ownerId,
    };

    const [createdTodo] = await this.queryBuilder()
      .insert(todoToCreate)
      .into("todos")
      .returning("*");

    return createdTodo;
  }

  static async updateTodo(todoId: string, newTodo: ITODO, userId: string) {
    const todoToUpdate = {
      title: newTodo.title,
      description: newTodo.description,
      updatedAt: new Date(),
      updatedBy: userId,
    };
    const [updatedTodo] = await this.queryBuilder()
      .update(todoToUpdate)
      .table("todos")
      .where({ id: todoId })
      .returning("*");

    return updatedTodo;
  }

  static async deleteTodo(todoId: string) {
    await this.queryBuilder().table("todos").del().where({ id: todoId });
  }
}
export function getTodos(userId: string) {
  logger.info("get todos");

  const todo = todos.filter((todo) => todo.userId == userId);

  if (!todo) {
    error: "Todos with the user Id doesnot exists";
  }

  return todo;
}

export function getTodosById(id: string, userId: string) {
  logger.info("get todo by id");

  const todo = todos.find(
    ({ id: todoId, userId: owner }) => todoId === id && userId === owner
  );

  return todo;
}

export function createTodo(userId: string, todo: ITODO) {
  logger.info("create todo");
  todos.push({
    ...todo,
    id: `${todos.length + 1}`,
    userId: `${userId}`,
  });
  return todos;
}

export function updateTodo(id: string, newTodo: ITODO, userId: string) {
  logger.info("update todos");
  const updatedTodo = todos.map((todo) => {
    return todo.id === id
      ? { ...newTodo, id: todo.id, userId: todo.userId }
      : todo;
  });
  const authTodos = updatedTodo.filter((todo) => todo.userId == userId);
  return authTodos;
}

export function deleteTodo(id: string, userId: string) {
  logger.info("delete todo");

  todos = todos.filter((todo) => todo.id !== id);
}
