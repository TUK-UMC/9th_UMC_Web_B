import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodo } from '../context/TodoContext';
import ThemeToggleButton from './ThemeToggleButton';

const Todo = () => {
    const context = useTodo();

    return (
        <div className='todo-container'>
            <ThemeToggleButton />
            <h1 className='todo-container__header'>Todo List</h1>
            <TodoForm />
            <div className='render-container'>
                <TodoList 
                    title='해야할 일' 
                    todos={context.todos} 
                    buttonLabel='완료' 
                    buttonColor='green'
                    onClick={context.completeTodo} />
                <TodoList 
                    title='해낸 일' 
                    todos={context.doneTodos} 
                    buttonLabel='삭제' 
                    buttonColor='red'
                    onClick={context.deleteTodo} />
            </div>
        </div>
    )
};

export default Todo;
