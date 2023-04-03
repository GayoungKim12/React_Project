import { ReactNode } from "react";

interface todoListAreaProps {
  children: ReactNode;
  todoCount: number;
}

// High Order Component
const TodoListArea = (props: todoListAreaProps) => {
  if (props.todoCount === 0) return null;
  return <>{props.children}</>;
};

export default TodoListArea;
