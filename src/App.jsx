import { useState } from "react";

function App() {
  // === State ===
  const [todos, setTodos] = useState([]); // array of todo objects
  const [newTodo, setNewTodo] = useState(""); // input field text

  // === Handlers ===
  const handleInputChange = (e) => {
    setNewTodo(e.target.value); // update input value
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop form refresh
    if (!newTodo.trim()) return; // prevent empty adds

    const todo = {
      id: Date.now(), // unique id
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]); // add new todo
    setNewTodo(""); // clear input
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // === Derived count ===
  const remaining = todos.filter((t) => !t.completed).length;

  // === Render ===
  return (
    <div className="todo-app" style={styles.container}>
      <h1>My Todo List</h1>

      {/* === Form === */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Todo
        </button>
      </form>

      {/* === Count === */}
      <p style={styles.count}>
        {remaining} {remaining === 1 ? "task" : "tasks"} remaining
      </p>

      {/* === Todos List === */}
      {todos.length === 0 ? (
        <p style={styles.empty}>No todos yet — add one above!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  ...styles.text,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "#000",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// === Inline Styles (Simple, no CSS file) ===
const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  count: { marginBottom: "10px", fontWeight: "bold" },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  text: { cursor: "pointer", flex: 1, textAlign: "left" },
  deleteButton: {
    background: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer",
    fontSize: "16px",
  },
  empty: { color: "#777" },
};

export default App;
