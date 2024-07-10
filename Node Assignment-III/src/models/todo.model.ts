import ITODO from "../interfaces/todo.interface";

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

export function getTodos(userId: string) {
  const todo = todos.filter((todo) => todo.userId == userId);
  if (!todo) {
    error: "Todos with the user Id doesnot exists";
  }
  return todo;
}

export function getTodosById(id: string, userId: string) {
  // console.log(userId);

  const todo = todos.find(({ id: userIds }) => userIds == id && userId == id);

  return todo;
}
export function createTodo(userId: string, todo: ITODO) {
  todos.push({
    ...todo,
    id: `${todos.length + 1}`,
    userId: `${userId}`,
  });
  return todos;
}

export function updateTodo(id: string, newTodo: ITODO, userId: string) {
  const updatedTodo = todos.map((todo) => {
    return todo.id === id
      ? { ...newTodo, id: todo.id, userId: todo.userId }
      : todo;
  });
  const authTodos = updatedTodo.filter((todo) => todo.userId == userId);
  return authTodos;
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
