import { FormEvent, useReducer, useState } from 'react';
import './App.css';
import Todo from './components/Todo';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
};

export type TodoType = { id: number; name: string; complete: boolean };
export type Action = { type: string; payload: { name: string; id?: number } };

const reducer = (todos: TodoType[], action: Action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
};

const newTodo = (name: string) => {
  return { id: Date.now(), name: name, complete: false };
};

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  };

  return (
    <div>
      <h2>UseReducer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <div>
        {todos.map((todo: TodoType) => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}

export default App;
