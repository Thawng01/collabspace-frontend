import React from 'react';
import { type Activity } from '../../types';
import { Activity as ActivityIcon, Calendar, User, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'task_created':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'task_assigned':
        return <User className="w-4 h-4 text-blue-500" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        <ActivityIcon className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="mt-1">
              {getActivityIcon(activity.action)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.details || 'Activity'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.action.replace('_', ' ')}
              </p>
              <div className="flex items-center mt-1">
                <Calendar className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
        View all activities
      </button>
    </div>
  );
};

export default RecentActivities;