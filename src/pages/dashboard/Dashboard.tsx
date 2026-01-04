
import {
  BarChart3,

  CheckSquare,
  Clock,
  Inbox,
 
} from 'lucide-react';
import type { DashboardStats } from '../../components/dashboard/TaskOverview';
import type { Activity } from '../../types';
import QuickActions from '../../components/dashboard/QuickActions';
import StatCard from '../../components/dashboard/StatCard';
import ProjectsOverview from '../../components/dashboard/ProjectsOverview';
import RecentActivities from '../../components/dashboard/RecentActivity';
import TaskOverview from '../../components/dashboard/TaskOverview';
import useFetch from '../../hooks/useFetch';



const Dashboard = () => {
  

  const {data: statsCard, isLoading } = useFetch("/dashboard")



  // Mock data - replace with actual API calls
  const stats: DashboardStats = {
    totalTasks: 128,
    completedTasks: 64,
    inProgressTasks: 32,
    pendingTasks: 24,
    overdueTasks: 8,
    totalProjects: 12,
    activeProjects: 8,
    totalMembers: 42
  };

  const recentActivities: Activity[] = [
    {
      id: '1',
      action: 'TASK_UPDATE',
      details: 'Implement user authentication' ,
      createdAt: new Date('2024-01-15T10:30:00'),

      projectId: 'project1',
      
    },
    {
      id: '2',
      action: 'STATUS_CHANGE',
      details: 'Design dashboard UI',
      createdAt: new Date('2024-01-15T09:15:00'),
      projectId: 'project1',
    }
  ];

  const projects: any[] = [
    { id: '1', name: 'Website Redesign', description: 'Complete website overhaul', color: '#3B82F6', createdAt: new Date(), updatedAt: new Date(), workspaceId: 'ws1' },
    { id: '2', name: 'Mobile App', description: 'iOS and Android development', color: '#10B981', createdAt: new Date(), updatedAt: new Date(), workspaceId: 'ws1' },
    { id: '3', name: 'API Development', description: 'Backend API services', color: '#8B5CF6', createdAt: new Date(), updatedAt: new Date(), workspaceId: 'ws1' }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'assignment',
      title: 'New Task Assigned',
      message: 'You have been assigned to "Fix login bug"',
      read: false,
      createdAt: new Date('2024-01-15T08:00:00'),
     
      taskId: 'task3'
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned',
      message: '@you mentioned in a comment on "Dashboard design"',
      read: true,
      createdAt: new Date('2024-01-14T16:30:00'),
      taskId: 'task4'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      

      
          <div className="max-w-7xl mx-auto">
            <QuickActions />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Tasks"
                value={statsCard?.totalTasks.toString()}
                change={statsCard?.percentageChanges.totalTasks}
                icon={CheckSquare}
                color="blue"
              />
              <StatCard
                title="Completed"
                value={statsCard?.totalCompleted.toString()}
                change={statsCard?.percentageChanges.totalCompleted}
                icon={BarChart3}
                color="green"
              />
              <StatCard
                title="In Progress"
                value={statsCard?.totalInProgress.toString()}
                change={statsCard?.percentageChanges.totalInProgress}
                icon={Clock}
                color="yellow"
              />
              <StatCard
                title="Overdue"
                value={statsCard?.overDue?.length || 0}
                // change={statsCard?.overDue?.length}
                icon={Inbox}
                color="red"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Projects Overview */}
              <div className="lg:col-span-2">
                <ProjectsOverview />
              </div>

              {/* Recent Activities */}
              <div>
                <RecentActivities activities={recentActivities} />
              </div>
            </div>

            {/* Task Overview */}
            <div className="mb-8">
              <TaskOverview stats={stats} />
            </div>
          </div>
        
      </div>
  
  );
};

export default Dashboard;