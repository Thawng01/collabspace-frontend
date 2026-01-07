
import {
  BarChart3,
  CheckSquare,
  Clock,
  Inbox,
} from 'lucide-react';
import QuickActions from '../../components/dashboard/QuickActions';
import StatCard from '../../components/dashboard/StatCard';
import ProjectsOverview from '../../components/dashboard/ProjectsOverview';
import TaskOverview from '../../components/dashboard/TaskOverview';
import useFetch from '../../hooks/useFetch';

const Dashboard = () => {

  const {data: statsCard, isLoading } = useFetch("/dashboard")


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
              <div className="lg:col-span-3">
                <ProjectsOverview />
              </div>
            </div>

            {/* Task Overview */}
            <div className="mb-8">
              <TaskOverview />
            </div>
          </div>
        
      </div>
  
  );
};

export default Dashboard;