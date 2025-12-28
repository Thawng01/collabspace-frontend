import React from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import { 
  PlusCircle, 
  Edit2, 
  Move,
  Calendar,
  Hash,
  Flag
} from 'lucide-react';
import type { ActivityData } from '../../types';

export type ActivityAction = 
  | 'COMMENT' 
  | 'TASK_UPDATE' 
  | 'STATUS_CHANGE' | "PRIORITY_CHANGE"


export type ActivityDetails = {
  [key: string]: any;
  previous?: any;
  current?: any;
  changes?: string[];
  field?: string;
  from?: string;
  to?: string;
  comment?: string;
};




interface ActivityCardProps {
  activity: ActivityData;
  viewMode?: 'list' | 'compact';
  onViewTask?: (taskId: string) => void;
  onViewProject?: (projectId: string) => void;
  onViewUser?: (userId: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  viewMode = 'list',
  onViewTask,
  onViewProject,
  onViewUser 
}) => {
  
  const getActionConfig = (action: ActivityAction) => {
    const configs = {
      TASK_UPDATE: { 
        icon: PlusCircle, 
        color: 'text-green-500', 
        bgColor: 'bg-green-50',
        label: 'Task updated'
      },
      STATUS_CHANGE: { 
        icon: Edit2, 
        color: 'text-amber-500', 
        bgColor: 'bg-amber-50',
        label: 'Status Change'
      },
      PRIORITY_CHANGE: { 
        icon: Flag, 
        color: 'text-blue-500', 
        bgColor: 'bg-blue-50',
        label: 'Priority Change'
      },
      COMMENT: { 
        icon: Move, 
        color: 'text-purple-500', 
        bgColor: 'bg-purple-50',
        label: 'Comment'
      },
    
    };
    
    return configs[action] || { 
      icon: Calendar, 
      color: 'text-gray-500', 
      bgColor: 'bg-gray-50',
      label: 'Activity'
    };
  };



  const actionConfig = getActionConfig(activity.action);
  const ActionIcon = actionConfig.icon;
  const timeAgo = formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true });
  const exactTime = format(new Date(activity.createdAt), 'MMM d, yyyy h:mm a');


  const statusColor = (status: string) => {
  
     switch(status) {
      case "IN_PROGRESS":
      return 'bg-yellow-50 text-yellow-500';
        
        case "IN_REVIEW":
         return  "bg-blue-100 text-blue-600";
          
          case "DONE":
          return "bg-green-100 text-green-600"
           
          default: 
           return "bg-gray-100 text-skyblue-600"
     }
  }

  if (viewMode === 'compact') {
    return (
      <div className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 p-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${actionConfig.bgColor}`}>
            <ActionIcon className={`w-4 h-4 ${actionConfig.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.details}
                </p>
                <div className="mt-1 flex items-center space-x-3">
                  <button
                    onClick={() => onViewProject?.(activity.project.id)}
                    className="inline-flex items-center text-xs text-gray-500 hover:text-gray-700"
                  >
                    <span 
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: activity.project?.color || '#6B7280' }}
                    ></span>
                    {activity.project?.name}
                  </button>
                  
                  {activity.task && (
                    <button
                      onClick={() => onViewTask?.(activity.task.id!)}
                      className="inline-flex items-center text-xs text-gray-500 hover:text-gray-700"
                    >
                      <Hash className="w-3 h-3 mr-1" />
                      {activity.task.title}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                {timeAgo}
              </div>
            </div>
            
            {/* {formatDetails()} */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 p-5 shadow-sm hover:shadow-md">
      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <button
          onClick={() => onViewUser?.(activity.user.id)}
          className="flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          {activity.user?.avatar ? (
            <img
              src={activity.user.avatar}
              alt={activity.user.name}
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
              {activity.user.name.charAt(0) || 'U'}
            </div>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onViewUser?.(activity.user.id)}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {activity.user?.name}
                </button>
                
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionConfig.bgColor} ${actionConfig.color}`}>
                  <ActionIcon className="w-3 h-3 mr-1" />
                  {actionConfig.label}
                </div>
              </div>
              
              <p className="mt-2 text-sm text-gray-700">
                {activity.details}
              </p>
              
              {/* {formatDetails()} */}
              
              <div className="mt-4 flex items-center space-x-4">
                {activity.project && (
                  <button
                    onClick={() => onViewProject?.(activity.project.id)}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                  >
                    {/* <span className="mr-2">{activity.projec}</span> */}
                    <span className="font-medium">{activity.project.name}</span>
                  </button>
                )}
                
                {activity.task && (
                  <>
                  <button
                    onClick={() => onViewTask?.(activity.task.id!)}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-sm text-blue-700 transition-colors"
                    >
                    <Hash className="w-4 h-4 mr-2" />
                    <span className="font-medium">{activity.task.title}</span>
                    
                  </button>
                  {activity.task.status && (
                    <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${statusColor(activity.task.status)}`}>
                        {activity.task.status}
                      </span>
                    )}
                    </>
                )}
              </div>
            </div>
            
            <div className="ml-4 flex flex-col items-end">
              <time 
                dateTime={activity.createdAt.toString()} 
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-help"
                title={exactTime}
              >
                {timeAgo}
              </time>
              
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;