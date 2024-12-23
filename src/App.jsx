import { useEffect, useState } from "react";
import "./index.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

 
    useEffect(() => {
      localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])


  function addTodo(title) {
     setTodos((currentTodos) => {
          return [
            ...currentTodos,
            {
              id: crypto.randomUUID(), title, completed: false
            },
          ]
        }
          )
  }

  function toggleTodo(id, completed) {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? {...todo, completed} : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== id)
    );
  }

  return (
    <div>
      <NewTodoForm onSubmit={addTodo}/>

      <h1 className="header">Todo List</h1>
     <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </div>
  );
}
