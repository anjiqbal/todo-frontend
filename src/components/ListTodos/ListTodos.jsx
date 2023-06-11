import { Fragment, useEffect, useState } from "react";
import EditTodo from "../EditTodo/EditTodo";

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const response = await fetch("todo-61ad.up.railway.app/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function deleteTodo(id) {
    try {
      await fetch(`todo-61ad.up.railway.app/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
