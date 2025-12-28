import React from 'react';
import { Plus, FileText, Users} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: Plus, label: 'New Task', color: 'bg-blue-100 text-blue-700' },
    { icon: FileText, label: 'New Project', color: 'bg-green-100 text-green-700' },
    { icon: Users, label: 'Invite Member', color: 'bg-purple-100 text-purple-700' },
   

  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className={`p-3 rounded-full ${action.color} mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;