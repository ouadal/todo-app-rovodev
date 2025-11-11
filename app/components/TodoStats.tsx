'use client'

interface TodoStatsProps {
  totalCount: number
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

export default function TodoStats({ 
  totalCount, 
  activeCount, 
  completedCount, 
  onClearCompleted 
}: TodoStatsProps) {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{activeCount} active{activeCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{completedCount} terminée{completedCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>{totalCount} au total</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {completedCount > 0 && (
            <div className="text-sm text-gray-600">
              <span className="font-medium text-green-600">{completionPercentage}%</span> complété
            </div>
          )}
          
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            >
              Supprimer les terminées
            </button>
          )}
        </div>
      </div>

      {totalCount > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}