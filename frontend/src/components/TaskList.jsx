import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks found. Add some to get started!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-card">
                    <div className="task-content">
                        <h4>{task.name}</h4>
                        <p>{task.description}</p>
                    </div>
                    <div className="task-actions">
                        <button 
                            className="btn-icon edit" 
                            onClick={() => onEdit(task)}
                            title="Edit Task"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button 
                            className="btn-icon delete" 
                            onClick={() => onDelete(task.id)}
                            title="Delete Task"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
