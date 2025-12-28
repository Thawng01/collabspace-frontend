import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalProjects: number;
  activeProjects: number;
  totalMembers: number;
}

interface TaskOverviewProps {
  stats: DashboardStats;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ stats }) => {
  const pieData = [
    { name: 'Completed', value: stats.completedTasks, color: '#10B981' },
    { name: 'In Progress', value: stats.inProgressTasks, color: '#F59E0B' },
    { name: 'Pending', value: stats.pendingTasks, color: '#3B82F6' },
    { name: 'Overdue', value: stats.overdueTasks, color: '#EF4444' }
  ];

  const weeklyData = [
    { day: 'Mon', completed: 12, inProgress: 8, pending: 6 },
    { day: 'Tue', completed: 15, inProgress: 7, pending: 5 },
    { day: 'Wed', completed: 8, inProgress: 10, pending: 8 },
    { day: 'Thu', completed: 18, inProgress: 6, pending: 4 },
    { day: 'Fri', completed: 11, inProgress: 9, pending: 7 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Task Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Weekly Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#10B981" name="Completed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" fill="#F59E0B" name="In Progress" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#3B82F6" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;