import React, { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import {
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import { PieChartComponent } from "./PieChartComponent";
import { BarChartComponent } from "./BarChartComponent";

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

interface TaskDistributionData {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

// ==================== LOADING COMPONENTS ====================
const TaskDistributionLoading: React.FC = () => (
  <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4 animate-pulse">
        <PieChartIcon className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500">Loading task distribution...</p>
    </div>
  </div>
);

const WeeklyProgressLoading: React.FC = () => (
  <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4 animate-pulse">
        <BarChart3 className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500">Loading weekly progress...</p>
    </div>
  </div>
);

// ==================== EMPTY STATE COMPONENTS ====================
const TaskDistributionEmpty: React.FC = () => (
  <div className="h-64 flex flex-col items-center justify-center rounded-lg bg-gray-50/50">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
      <PieChartIcon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-sm font-medium text-gray-900 mb-1">
      No task data available
    </h3>
    <p className="text-sm text-gray-500 text-center px-4">
      There are no tasks to display in the selected period.
    </p>
  </div>
);

// ==================== ERROR STATE COMPONENTS ====================
const TaskDistributionError: React.FC<{ message?: any }> = ({ message }) => (
  <div className="h-64 flex flex-col items-center justify-center border border-red-200 rounded-lg bg-red-50/50">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
      <AlertCircle className="w-6 h-6 text-red-600" />
    </div>
    <h3 className="text-sm font-medium text-gray-900 mb-1">
      Failed to load data
    </h3>
    <p className="text-sm text-gray-600 mb-4">
      {message || "Could not load task distribution."}
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

const WeeklyProgressError: React.FC<{ message?: any }> = ({ message }) => (
  <div className="h-64 flex flex-col items-center justify-center border border-red-200 rounded-lg bg-red-50/50">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
      <AlertCircle className="w-6 h-6 text-red-600" />
    </div>
    <h3 className="text-sm font-medium text-gray-900 mb-1">
      Chart unavailable
    </h3>
    <p className="text-sm text-gray-600 mb-4">
      {message || "Could not load weekly progress."}
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

const TaskOverview = () => {
  const [pieData, setPieData] = useState<TaskDistributionData[]>([]);
  const { data, isLoading, error } = useFetch("/dashboard/task/overview");
  const {
    data: weeklyTask,
    isLoading: weeklyLoading,
    error: weeklyError,
  } = useFetch("/dashboard/task/weekly/overview");

  // Icons for task status
  const taskIcons = {
    completed: <CheckCircle className="w-4 h-4" />,
    "in-progress": <TrendingUp className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    overdue: <AlertTriangle className="w-4 h-4" />,
  };

  useEffect(() => {
    if (data) {
      // Handle pie chart data

      const pieChartData: any[] = [
        {
          name: "Completed",
          value: data.totalTaskCompleted || 0,
          color: "#10B981",
          icon: taskIcons.completed,
        },
        {
          name: "In Progress",
          value: data.totalTaskInProgress || 0,
          color: "#F59E0B",
          icon: taskIcons["in-progress"],
        },
        {
          name: "Pending",
          value: data.totalTaskPending || 0,
          color: "#3B82F6",
          icon: taskIcons.pending,
        },
      ];

      // Filter out zero values
      const filteredPieData = pieChartData.filter((item) => item.value > 0);
      setPieData(filteredPieData);
    }
  }, [data]);

  // Overall loading state
  if (isLoading && !data && !error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Task Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TaskDistributionLoading />
          <WeeklyProgressLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Task Overview</h2>
        <div className="text-sm text-gray-500">
          Total: {pieData.reduce((sum, item) => sum + item.value, 0)} tasks
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Task Distribution */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Task Distribution
            </h3>
            <span className="text-xs text-gray-500">Real-time data</span>
          </div>

          {isLoading ? (
            <TaskDistributionLoading />
          ) : error ? (
            <TaskDistributionError message={error} />
          ) : pieData.length === 0 ? (
            <TaskDistributionEmpty />
          ) : (
            <>
              <PieChartComponent data={pieData} />

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-6">
                {pieData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value}
                      </span>
                      {item.icon}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Weekly Progress
            </h3>
          </div>

          {weeklyLoading ? (
            <WeeklyProgressLoading />
          ) : weeklyError ? (
            <WeeklyProgressError message={weeklyError} />
          ) : (
            <>
              <BarChartComponent data={weeklyTask?.dailyData} />

              {/* Weekly summary */}
              <div className="mt-4 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    This week's summary
                  </span>
                  <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {weeklyTask?.dailyData.reduce(
                        (sum: number, day: any) => sum + day.completed,
                        0
                      )}
                    </div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600">
                      {weeklyTask?.dailyData.reduce(
                        (sum: number, day: any) => sum + day.inProgress,
                        0
                      )}
                    </div>
                    <div className="text-xs text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {weeklyTask.dailyData.reduce(
                        (sum: number, day: any) => sum + day.pending,
                        0
                      )}
                    </div>
                    <div className="text-xs text-gray-600">Pending</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
