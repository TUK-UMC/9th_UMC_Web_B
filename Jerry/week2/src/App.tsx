import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider } from "./context/TodoContext";

function App() : React.ReactElement {
  return (
    <TodoProvider> {/* Context Provider로 감싸기 */}
      <Todo />
    </TodoProvider>
  );
}

export default App;