import ITODO from "../interfaces/todo.interface";
import { GetUserQuery } from "../interfaces/user.interface";
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
  static getTodos(userId: string, filter: GetUserQuery) {
    const { q } = filter;
    const todo = this.queryBuilder()
      .select(
        "todos.id",
        "todos.title",
        "todos.description",
        "todos.userId",
        "todos.created_at"
      )
      .table("todos")
      .where("userId", userId)
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);

    if (q) {
      // query.where({ name: q });
      todo.whereLike("title", `%${q}%`);
    }

    return todo;
  }
  static count(filter: GetUserQuery) {
    const { q } = filter;

    const query = this.queryBuilder().count("*").table("users").first();

    if (q) {
      query.whereLike("title", `%${q}%`);
    }

    return query;
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
