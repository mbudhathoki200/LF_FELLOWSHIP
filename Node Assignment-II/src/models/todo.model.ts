import ITODO from "../interfaces/todo.interface";

let todos = [
  {
    id: "1",
    title: "CODE",
    description: "CODE CODE CODE",
  },
];

export function getTodos() {
  return todos;
}

export function getTodosById(id: string) {
  return todos.find(({ id: userId }) => userId == id);
}
export function createTodo(todo: ITODO) {
  todos.push({
    id: `${todos.length + 1}`,
    ...todo,
  });
  return todos;
}

export function updateTodo(id: string, newTodo: ITODO) {
  todos = todos.map((todo) => {
    return todo.id === id ? { ...newTodo, id: todo.id } : todo;
  });
  return todos;
}

export function deleteTodo(id: string) {
  todos = todos.filter((todo) => todo.id !== id);
  console.log(todos);
  return todos;
}
