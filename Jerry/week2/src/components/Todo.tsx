import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodo } from "../context/TodoContext";

// 할 일 관리 컴포넌트
const Todo = (): React.ReactElement => {
  const { todos, handleDone, handleDelete, doneTodos } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">Jerry Todo</h1>
      <TodoForm /> {/* 할 일 추가 폼 */}
      <div className="render-container">
        <TodoList // 할 일 리스트 컴포넌트
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={handleDone}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Todo;
