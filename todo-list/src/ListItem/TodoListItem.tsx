import styles from "./TodoListItem.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface TodoItemProps {
  id: number;
  text: string;
  isChecked: boolean;
  onToggleCheckTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoListItem = (props: TodoItemProps) => {
  const handleToggleCheckTodo = () => {
    props.onToggleCheckTodo(props.id);
  };

  const handleRemoveTodo = () => {
    props.onRemoveTodo(props.id);
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
