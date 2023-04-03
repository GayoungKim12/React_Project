import { ChangeEvent, FormEvent } from "react";
import styles from "./TodoInput.module.css";
import { RiChatNewLine } from "react-icons/ri";

interface TodoInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}

const TodoInput = (props: TodoInputProps) => {
  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    props.onTextChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder={"오늘의 Todo"}
          value={props.text}
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
