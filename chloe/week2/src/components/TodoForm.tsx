import {useState, FormEvent} from 'react';
import { useTodo } from '../context/TodoContext';

const TodoForm = () : React.ReactElement => {
    const [input, setInput] = useState<string>('');
    const { addTodo } = useTodo();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void =>{
        e.preventDefault();
        const text = input.trim();
    
        if(text){
            addTodo(text);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} 
        className='todo-container__form'>
            <input 
                value={input}
                onChange={(e):void => setInput(e.target.value)}
                className='todo-container__input' 
                type="text" 
                placeholder='할 일을 입력'
                required
            />
            <button className='todo-container__button' type='submit'>
                할 일 추가
            </button>
        </form>
    );
};

export default TodoForm;