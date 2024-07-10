import { todo } from "node:test";
import ITODO from "../interfaces/todo.interface";
import { error } from "node:console";

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

export function getTodos() {
  return todos;
}

export function getTodosById(id: string) {
  return todos.find(({ id: userId }) => userId == id);
}
export function createTodo(userId: string, todo: ITODO) {
  console.log(todo);
  todos.push({
    ...todo,
    id: `${todos.length + 1}`,
    userId: `${userId}`,
  });
  return todos;
}

export function updateTodo(id: string, newTodo: ITODO) {
  todos = todos.map((todo) => {
    return todo.id === id ? { ...newTodo, id: todo.id } : todo;
  });
  return todos;
}

export function deleteTodo(id: string, userId: string) {
  const todo = todos.find((todo) => todo.id == id);
  if (!todo) {
    return {
      message: `Todo with the id ${id} does not exists`,
    };
  }

  const isOwnerOfTodo = todo.userId === userId;

  if (!isOwnerOfTodo) {
    return {
      message: "Unauthorized deletion",
    };
  }

  todos = todos.filter((todo) => todo.id !== id);
}
