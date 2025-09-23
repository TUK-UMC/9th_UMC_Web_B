import { useState } from 'react';
import { TTodo } from '../types/todo';

const Todo = () : React.ReactElement => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const newTodo: TTodo = {
      id: Date.now(),
      text: input,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDone = (todo: TTodo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setDoneTodos([...doneTodos, todo]);
  };

  const handleDelete = (todo: TTodo) => {
    setDoneTodos(doneTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <div className='todo-container'>
      <h1 className='todo-container__header'>Jerry Todo</h1>
      <form className='todo-container__form' onSubmit={handleSubmit}>
        <input className='todo-container__input' type="text" placeholder='할 일 입력' required value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='todo-container__button' type='submit'>할 일 추가</button>
      </form>
      <div className='render-container'>
        <div className='render-container__section'>
          <h2 className='render-container__title'>할 일</h2>
          <ul id="todo-list" className='render-container__list'>
            {todos.map((todo) : React.ReactElement => (
              <li key={todo.id} className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
                <button
                  onClick={() => handleDone(todo)}
                  style={{ backgroundColor: '#28a745' }}
                  className='render-container__item-button'>완료
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='render-container__section'>
          <h2 className='render-container__title'>완료</h2>
          <ul id="todo-list" className='render-container__list'>
            {doneTodos.map((todo) : React.ReactElement => (
              <li key={todo.id} className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
                <button
                  onClick={() => handleDelete(todo)}
                  style={{ backgroundColor: '#dc3545' }}
                  className='render-container__item-button'>삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;