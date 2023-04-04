import { ChangeEvent, FormEvent } from "react";
import styles from "./TodoInput.module.css";
import { RiChatNewLine } from "react-icons/ri";
import {
  useInputTodoDispatch,
  useInputTodoState,
  useTodoDispatch,
} from "../Todo/TodoProvider";

const TodoInput = () => {
  const todoDispatch = useTodoDispatch();
  const inputState = useInputTodoState();
  const inputDispatch = useInputTodoDispatch();

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    inputDispatch({
      type: "change",
      payload: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputState.text) return null;

    todoDispatch({
      type: "add",
      payload: {
        text: inputState.text,
      },
    });

    inputDispatch({ type: "clear" });
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder={"오늘의 Todo"}
          value={inputState.text}
          onChange={handleInputChanged}
        />
        <button className={styles.enter}>
          <RiChatNewLine />
        </button>
      </form>
    </section>
  );
};

export default TodoInput;
