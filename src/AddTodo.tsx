import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TodoPriority } from '../types';

interface AddTodoProps {
  onAdd: (data: {
    title: string;
    description?: string;
    priority: TodoPriority;
    dueDate?: string;
  }) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add New Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full px-3 py-2 border rounded-md"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full px-3 py-2 border rounded-md"
        />
        <div className="flex gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TodoPriority)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}