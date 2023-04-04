import { useReducer } from "react";
import "./App.css";
import TodoHeader from "./Header/TodoHeader";
import TodoInput from "./Input/TodoInput";
import TodoListTools from "./Tools/TodoListTools";
import Divider from "./Divider/Divider";
import TodoList from "./List/TodoList";
import TodoListArea from "./List/TodoListArea";
import { todoInputReducer } from "./Todo/TodoInputReducer";
import { todoReducer } from "./Todo/TodoReducer";

function App() {
  const [inputState, inputDispatch] = useReducer(todoInputReducer, {
    text: "",
  });
  const [todoState, todoDispatch] = useReducer(todoReducer, { todos: [] });

  const handleTextChange = (text: string) => {
    inputDispatch({
      type: "change",
      payload: text,
    });
  };

  const handleSubmit = () => {
    if (!inputState.text) return null;

    todoDispatch({
      type: "add",
      payload: {
        text: inputState.text,
      },
    });

    return inputDispatch({ type: "clear" });
  };

  const handleToggle = (id: number) => {
    return todoDispatch({
      type: "checked",
      payload: { id },
    });
  };

  const handleRemove = (id: number) => {
    return todoDispatch({
      type: "remove",
      payload: { id },
    });
  };

  const isTodoAllChecked = () => {
    return todoState.todos.every((todo) => todo.isChecked);
  };

  const handleToggleAll = () => {
    return todoDispatch({
      type: "allChecked",
      payload: { isAllChecked: isTodoAllChecked() },
    });
  };

  const handleRemoveAll = () => {
    return todoDispatch({
      type: "allRemove",
    });
  };

  return (
    <main className="App">
      <TodoHeader
        count={todoState.todos.filter((todo) => !todo.isChecked).length}
      />
      <TodoInput
        text={inputState.text}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />
      <TodoListArea todoCount={todoState.todos.length}>
        <TodoListTools
          isAllChecked={isTodoAllChecked()}
          onToggleAllClick={handleToggleAll}
          onRemoveAllClick={handleRemoveAll}
        />
        <Divider />
        <TodoList
          todos={todoState.todos}
          onToggleCheckTodo={handleToggle}
          onRemoveTodo={handleRemove}
        />
      </TodoListArea>
    </main>
  );
}

export default App;
