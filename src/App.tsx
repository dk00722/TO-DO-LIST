import React, { useEffect, useState } from 'react';
import { ListTodo } from 'lucide-react';
import { Todo } from './types';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';

const STORAGE_KEY = 'todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (data: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      ...data,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <ListTodo size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
        </div>

        <AddTodo onAdd={addTodo} />

        <div className="space-y-6">
          {activeTodos.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Active Tasks ({activeTodos.length})
              </h2>
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </section>
          )}

          {completedTodos.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Completed Tasks ({completedTodos.length})
              </h2>
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </section>
          )}

          {todos.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No tasks yet. Add your first task above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;