import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

// 컨텍스트의 타입 정의
interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  handleDone: (todo: TTodo) => void;
  handleDelete: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

// 컨텍스트 프로바이더 컴포넌트
export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  // 할 일 추가 함수
  const addTodo = (text: string) => {
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 할 일 완료 함수
  const handleDone = (todo: TTodo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  // 완료된 할 일 삭제 함수
  const handleDelete = (todo: TTodo) => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, handleDone, handleDelete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  // 컨텍스트가 없는 경우 에러 처리
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  // 컨텍스트 반환
  return context;
};
