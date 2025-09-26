import { useState } from "react";
import { useTodo } from "../context/TodoContext";

// 할 일 추가 폼 컴포넌트
const TodoForm = (): React.ReactElement => {
  const { addTodo } = useTodo();
  const [input, setInput] = useState<string>('');

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();

    if (text === '') return;

    addTodo(text);
    setInput('');
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        type="text"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button className="todo-container__button" type="submit">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
