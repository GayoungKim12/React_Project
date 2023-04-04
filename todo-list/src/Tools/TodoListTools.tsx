import styles from "./TodoListTools.module.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgRadioChecked } from "react-icons/cg";
import { useTodoDispatch, useTodoState } from "../Todo/TodoProvider";

const TodoListTools = () => {
  const todoState = useTodoState();
  const todoDispatch = useTodoDispatch();

  const isTodoAllChecked = () => {
    return todoState.todos.every((todo) => todo.isChecked);
  };

  const handleToggleAllClick = () => {
    todoDispatch({
      type: "allChecked",
      payload: { isAllChecked: isTodoAllChecked() },
    });
  };

  const handleRemoveAllClick = () => {
    todoDispatch({
      type: "allRemove",
    });
  };

  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={handleToggleAllClick}>
        {isTodoAllChecked() ? (
          <>
            <CgRadioChecked className={styles.toolIcon} />
            전체해제
          </>
        ) : (
          <>
            <IoCheckmarkDoneCircleOutline className={styles.toolIcon} />
            전체완료
          </>
        )}
      </button>
      <button className={styles.button} onClick={handleRemoveAllClick}>
        <MdDelete className={styles.toolIcon} />
        전체삭제
      </button>
    </section>
  );
};

export default TodoListTools;
