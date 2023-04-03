import React, { useState } from "react";
import "./App.css";
import TodoHeader from "./Header/TodoHeader";
import TodoInput from "./Input/TodoInput";
import TodoListTools from "./Tools/TodoListTools";
import Divider from "./Divider/Divider";
import TodoList from "./List/TodoList";
import TodoListArea from "./List/TodoListArea";

export type TodoType = {
  id: number;
  text: string;
  isChecked: boolean;
};

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleTextChange = (text: string) => {
    setText(text);
  };

  const handleSubmit = () => {
    if (!text) return null;
    const newTodos = todos.concat({
      id: Date.now(),
      text,
      isChecked: false,
    });

    setTodos(newTodos);
    setText("");
  };

  const handleToggle = (id: number) => {
    return setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isChecked: !todo.isChecked };
        } else {
          return todo;
        }
      })
    );
  };

  const handleRemove = (id: number) => {
    return setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const isTodoAllChecked = () => {
    return todos.every((todo) => todo.isChecked);
  };

  const handleToggleAll = () => {
    const isAllChecked = isTodoAllChecked();
    return setTodos(
      todos.map((todo) => {
        return { ...todo, isChecked: !isAllChecked };
      })
    );
  };

  const handleRemoveAll = () => {
    return setTodos([]);
  };

  return (
    <main className="App">
      <TodoHeader count={todos.filter((todo) => !todo.isChecked).length} />
      <TodoInput
        text={text}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />
      <TodoListArea todoCount={todos.length}>
        <TodoListTools
          isAllChecked={isTodoAllChecked()}
          onToggleAllClick={handleToggleAll}
          onRemoveAllClick={handleRemoveAll}
        />
        <Divider />
        <TodoList
          todos={todos}
          onToggleCheckTodo={handleToggle}
          onRemoveTodo={handleRemove}
        />
      </TodoListArea>
    </main>
  );
}

export default App;
