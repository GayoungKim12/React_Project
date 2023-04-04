import { TodoType } from "../Todo/TodoReducer";
import TodoListItem from "../ListItem/TodoListItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: TodoType[];
  onToggleCheckTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <section>
      <ol className={styles.olContainer}>
        {props.todos.map((todo, idx) => {
          return (
            <TodoListItem
              id={todo.id}
              key={todo.id}
              text={todo.text}
              isChecked={todo.isChecked}
              onToggleCheckTodo={props.onToggleCheckTodo}
              onRemoveTodo={props.onRemoveTodo}
            />
          );
        })}
      </ol>
    </section>
  );
};

export default TodoList;
