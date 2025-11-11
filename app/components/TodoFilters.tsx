'use client'

import { TodoFilter } from '../types'

interface TodoFiltersProps {
  currentFilter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
  activeCount: number
  completedCount: number
}

export default function TodoFilters({ 
  currentFilter, 
  onFilterChange, 
  activeCount, 
  completedCount 
}: TodoFiltersProps) {
  const filters: { key: TodoFilter; label: string; count?: number }[] = [
    { key: 'all', label: 'Toutes', count: activeCount + completedCount },
    { key: 'active', label: 'Actives', count: activeCount },
    { key: 'completed', label: 'Terminées', count: completedCount },
  ]

  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currentFilter === key
                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {label}
            {count !== undefined && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                currentFilter === key
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}