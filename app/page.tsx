'use client'

import { useState } from 'react'
import { TodoFilter } from './types'
import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import TodoStats from './components/TodoStats'

export default function Home() {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos()

  const toggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      updateTodo(id, { completed: !todo.completed })
    }
  }

  const editTodo = (id: string, newText: string) => {
    updateTodo(id, { text: newText.trim() })
  }

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed)
    for (const todo of completedTodos) {
      await deleteTodo(todo.id)
    }
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })


  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold text-center">Todo App</h1>
          </div>
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Chargement des tâches...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Todo App</h1>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">⚠️ {error}</p>
            </div>
          )}

          <TodoInput onAddTodo={addTodo} />
          
          <div className="mt-6">
            <TodoFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </div>

          <div className="mt-6">
            <TodoList
              todos={filteredTodos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onEditTodo={editTodo}
            />
          </div>

          {todos.length > 0 && (
            <div className="mt-6">
              <TodoStats
                totalCount={todos.length}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}