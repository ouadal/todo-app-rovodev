'use client'

import { useState } from 'react'
import { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (newText: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(editText.trim())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date)
  }

  return (
    <div className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
      todo.completed 
        ? 'bg-gray-50 border-gray-200 opacity-75' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div>
            <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.text}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Créé: {formatDate(todo.createdAt)}
              {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                <span> • Modifié: {formatDate(todo.updatedAt)}</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {!todo.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Modifier"
          >
            ✏️
          </button>
        )}
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}