import styles from "./TodoListTools.module.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgRadioChecked } from "react-icons/cg";

interface TodoListToolsProps {
  isAllChecked: boolean;
  onToggleAllClick: () => void;
  onRemoveAllClick: () => void;
}

const TodoListTools = (props: TodoListToolsProps) => {
  const handleToggleAllClick = () => {
    props.onToggleAllClick();
  };

  const handleRemoveAllClick = () => {
    props.onRemoveAllClick();
  };

  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={handleToggleAllClick}>
        {props.isAllChecked ? (
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
