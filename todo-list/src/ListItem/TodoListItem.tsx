import styles from "./TodoListItem.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useTodoDispatch } from "../Todo/TodoProvider";

interface TodoItemProps {
  id: number;
  text: string;
  isChecked: boolean;
}

const TodoListItem = (props: TodoItemProps) => {
  const todoDispatch = useTodoDispatch();

  const handleToggleCheckTodo = () => {
    todoDispatch({
      type: "checked",
      payload: { id: props.id },
    });
  };

  const handleRemoveTodo = () => {
    todoDispatch({
      type: "remove",
      payload: { id: props.id },
    });
  };

  return (
    <li className={styles.container}>
      <BsCheckCircle
        className={[
          styles.checkIcon,
          `${
            props.isChecked
              ? styles.checkedCircleIcon
              : styles.unCheckedCircleIcon
          }`,
        ].join(" ")}
        onClick={handleToggleCheckTodo}
      />
      <span className={props.isChecked ? styles.strikethrough : ""}>
        {props.text}
      </span>
      <IoIosRemoveCircleOutline
        className={styles.removeIcon}
        onClick={handleRemoveTodo}
      />
    </li>
  );
};

export default TodoListItem;
