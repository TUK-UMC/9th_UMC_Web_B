import { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";

const TodoBefore = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = {id: Date.now(), text};
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos): TTodo[] => prevTodos.filter((t): boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodo): TTodo[] => prevDoneTodo.filter((t): boolean => t.id !== todo.id));
    }

    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>Todo List</h1>
            <form onSubmit={handleSubmit} className='todo-container__form'>
                <input
                    value={input}
                    onChange={(e): void => setInput(e.target.value)}
                    type='text'
                    className='todo-container__input'
                    placeholder="할 일을 입력하세요."
                    required />
                <button type='submit' className='todo-container__button'>추가</button>
            </form>
            <div className='render-container'>
                <div className='render-container__section'>
                    <h2 className='render-container__header'>해야할 일</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {todos.map((todo) => (
                            <li key={todo.id} className='render-container__item'>
                                <span className='render-container__item-text'>{todo.text}</span>
                                <button 
                                    onClick={(): void => completeTodo(todo)}
                                    style={{
                                    backgroundColor: 'green',
                                }}
                                    className='render-container__item-button'>완료</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='render-container__section'>
                    <h2 className='render-container__header'>해낸 일</h2>
                    <ul id='done-list' className='render-container__list'>
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className='render-container__item'>
                                <span className='render-container__item-text'>{todo.text}</span>
                                <button 
                                    onClick={(): void => deleteTodo(todo)}
                                    style={{
                                    backgroundColor: 'red',
                                }}
                                    className='render-container__item-button'>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoBefore;