import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ActivityFiltersProps {
  selectedFilter: string;
  commentCount: number
  totalActivities: number
  priorityCount: number
  taskUpdateCount: number
  statusChangeCount: number
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  selectedFilter,
  onFilterChange,
  searchQuery,
  totalActivities,
  priorityCount,
  commentCount,
  taskUpdateCount,
  statusChangeCount,
  onSearchChange,
}) => {
  const filters = [
    { id: 'all', label: 'All Activities', count: totalActivities },
    { id: 'TASK_UPDATE', label: 'Updated', count: taskUpdateCount },
    { id: 'COMMENT', label: 'Comments', count: commentCount },
    { id: 'STATUS_CHANGE', label: 'Status Changed', count: statusChangeCount },
    { id: 'PRIORITY_CHANGE', label: 'Priority Changed', count: priorityCount },
  
    
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search activities, users, projects, or tasks..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span className="text-gray-400 hover:text-gray-600">✕</span>
            </button>
          )}
        </div>
        
        {/* <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div> */}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === filter.id
                ? ' bg-blue-100 text-blue-600 shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
              selectedFilter === filter.id
                ? 'bg-blue-200 text-blue-600'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityFilters;