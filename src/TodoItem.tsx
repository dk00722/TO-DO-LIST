import React, { useState } from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';
import { Todo, TodoPriority } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');
  const [editedPriority, setEditedPriority] = useState<TodoPriority>(todo.priority);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    onEdit(todo.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      dueDate: editedDueDate || undefined,
    });
    setIsEditing(false);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Description (optional)"
          />
          <div className="flex gap-3">
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value as TodoPriority)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 mb-3 bg-white shadow-sm ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {todo.completed && <Check size={12} className="text-white" />}
          </button>
          <div className="flex-1">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="mt-1 text-sm text-gray-600">{todo.description}</p>
            )}
            <div className="mt-2 flex gap-2 items-center text-sm">
              <span className={`px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              {todo.dueDate && (
                <span className="text-gray-500">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}