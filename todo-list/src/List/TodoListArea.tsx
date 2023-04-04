import { ReactNode } from "react";
import { useTodoState } from "../Todo/TodoProvider";

interface todoListAreaProps {
  children: ReactNode;
}

// High Order Component
const TodoListArea = (props: todoListAreaProps) => {
  const todoState = useTodoState();

  if (todoState.todos.length === 0) return null;
  return <>{props.children}</>;
};

export default TodoListArea;
