import { TodoType } from "./TodoReducer";

export const saveTodos = (todos: TodoType[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const loadTodos = () => {
  const todosJson = localStorage.getItem("todos");

  if (!todosJson) return [];

  try {
    return JSON.parse(todosJson);
  } catch (e) {
    console.log(e);
    return [];
  }
};
