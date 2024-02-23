import React, { Dispatch } from 'react';
import { ACTIONS, Action, TodoType } from '../App';

type TodoProps = {
  todo: TodoType;
  dispatch: Dispatch<Action>;
};

const Todo = ({ todo, dispatch }: TodoProps) => {
  return (
    <div>
      <span
        style={{
          color: 'black',
          backgroundColor: todo.complete ? 'green' : '#FFF',
          padding: '10px',
        }}
      >
        {todo.name}
      </span>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.TOGGLE_TODO,
            payload: { name: todo.name, id: todo.id },
          })
        }
      >
        Toggle
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: { name: todo.name, id: todo.id },
          })
        }
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
