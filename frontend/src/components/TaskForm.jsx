import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, XCircle } from 'lucide-react';

const TaskForm = ({ onSave, editingTask, onCancelEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setName(editingTask.name);
            setDescription(editingTask.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSave({
            id: editingTask ? editingTask.id : null,
            name,
            description
        });

        setName('');
        setDescription('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter task name..."
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description..."
                    rows="3"
                ></textarea>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    {editingTask ? <><Save size={18} /> Save Changes</> : <><PlusCircle size={18} /> Add Task</>}
                </button>
                {editingTask && (
                    <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                        <XCircle size={18} /> Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
