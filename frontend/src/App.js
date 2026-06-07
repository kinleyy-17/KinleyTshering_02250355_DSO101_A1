import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${API}/todos`);
    setTodos(await res.json());
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const saveEdit = async (id, completed) => {
    await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: editTask, completed }),
    });
    setEditId(null);
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await fetch(`${API}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: todo.task, completed: !todo.completed }),
    });
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>📝 Todo App</h1>
      <div>
        <input value={task} onChange={e => setTask(e.target.value)}
          placeholder="New task..." style={{ padding: 8, width: '75%' }} />
        <button onClick={addTodo} style={{ padding: 8, marginLeft: 8 }}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <input type="checkbox" checked={todo.completed}
              onChange={() => toggleComplete(todo)} style={{ marginRight: 8 }} />
            {editId === todo.id ? (
              <>
                <input value={editTask} onChange={e => setEditTask(e.target.value)}
                  style={{ flex: 1, padding: 4 }} />
                <button onClick={() => saveEdit(todo.id, todo.completed)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.task}
                </span>
                <button onClick={() => { setEditId(todo.id); setEditTask(todo.task); }}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 4 }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;