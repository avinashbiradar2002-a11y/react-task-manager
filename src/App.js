import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTaskList(Array.isArray(savedTasks) ? savedTasks : []);
    } catch {
      setTaskList([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const addTask = () => {
    if (tasks.trim() === "") return;
    setTaskList([...taskList, { text: tasks, done: false }]);
    setTasks("");
  };

  const toggleTask = (idx) => {
    setTaskList(
      taskList.map((task, i) =>
        i === idx ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <label>
        <span className="visually-hidden">Task input</span>
        <input
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder="Enter task"
          aria-label="Enter a new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
      </label>
      <button onClick={addTask}>Add</button>
      <ul>
        {taskList.map((task, idx) => (
          <li key={idx}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(idx)}
                aria-label={`Mark ${task.text} as done`}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "" }}>
                {task.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
