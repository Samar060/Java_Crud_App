import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { GrTask } from "react-icons/gr";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to connect to the backend server. Is Spring Boot running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (task) => {
    try {
      if (task.id) {
        // Update
        const response = await axios.put(`${API_URL}/${task.id}`, task);
        setTasks(tasks.map(t => t.id === task.id ? response.data : t));
        setEditingTask(null);
      } else {
        // Create
        const response = await axios.post(API_URL, task);
        setTasks([...tasks, response.data]);
      }
    } catch (err) {
      console.error("Error saving task:", err);
      setError("Failed to save the task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete the task.");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <GrTask size={32} />
          <h1>Tasker</h1>
        </div>
        <p className="subtitle">Manage your tasks effortlessly</p>
      </header>

      <main className="main-content">
        {error && <div className="error-banner">{error}</div>}
        
        <div className="layout-grid">
          <section className="form-section">
            <TaskForm 
              onSave={handleSaveTask} 
              editingTask={editingTask} 
              onCancelEdit={() => setEditingTask(null)} 
            />
          </section>

          <section className="list-section">
            <div className="section-header">
              <h2>Your Tasks</h2>
              <span className="badge">{tasks.length}</span>
            </div>
            
            {loading ? (
              <div className="loading">Loading Tasks...</div>
            ) : (
              <TaskList 
                tasks={tasks} 
                onEdit={handleEditTask} 
                onDelete={handleDeleteTask} 
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
