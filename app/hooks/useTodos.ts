import { useState, useEffect } from 'react'
import { Todo } from '../types'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les todos depuis l'API
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des todos')
      }
      const data = await response.json()
      
      // Convertir les dates string en objets Date
      const todosWithDates = data.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.created_at),
        updatedAt: new Date(todo.updated_at),
        completed: Boolean(todo.completed)
      }))
      
      setTodos(todosWithDates)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur lors du chargement des todos:', err)
    } finally {
      setLoading(false)
    }
  }

  // Ajouter une todo
  const addTodo = async (text: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la todo')
      }

      const newTodo = await response.json()
      const todoWithDates = {
        ...newTodo,
        createdAt: new Date(newTodo.created_at),
        updatedAt: new Date(newTodo.updated_at),
        completed: Boolean(newTodo.completed)
      }

      setTodos(prev => [todoWithDates, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout')
      console.error('Erreur lors de l\'ajout de la todo:', err)
    }
  }

  // Mettre à jour une todo
  const updateTodo = async (id: string, updates: Partial<{ text: string; completed: boolean }>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la todo')
      }

      const updatedTodo = await response.json()
      const todoWithDates = {
        ...updatedTodo,
        createdAt: new Date(updatedTodo.created_at),
        updatedAt: new Date(updatedTodo.updated_at),
        completed: Boolean(updatedTodo.completed)
      }

      setTodos(prev => prev.map(todo => 
        todo.id === id ? todoWithDates : todo
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
      console.error('Erreur lors de la mise à jour de la todo:', err)
    }
  }

  // Supprimer une todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la todo')
      }

      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
      console.error('Erreur lors de la suppression de la todo:', err)
    }
  }

  // Charger les todos au montage du composant
  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos
  }
}