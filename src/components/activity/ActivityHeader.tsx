import React from 'react';
import { RefreshCw, Download, List, Grid } from 'lucide-react';

interface ActivityHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  loading: boolean;
  title: string
  details: string
  viewMode: 'list' | 'compact';
  onViewModeChange: (mode: 'list' | 'compact') => void;
}

const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  onRefresh,
  onExport,
  loading,
  title,
  details,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Feed</h1>
          <p className="mt-2 text-gray-600">
            Track all project updates, task changes, and team activity in real-time
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange('compact')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'compact' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Compact view"
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={onExport}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className='pt-6'>
        <p className='font-bold'>{title}</p>
        <p className='font-light text-gray-500'>{details}</p>
      </div>
    </div>
  );
};

export default ActivityHeader;