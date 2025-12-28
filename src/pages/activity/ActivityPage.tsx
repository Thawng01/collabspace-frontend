import React, { useState, useEffect } from 'react';



import { format, isToday, isYesterday, subDays } from 'date-fns';
import ActivityCard from '../../components/activity/ActivityCard';
import ActivityFilters from '../../components/activity/ActivityFilter';
import ActivityHeader from '../../components/activity/ActivityHeader';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router';
import type { ActivityData } from '../../types';


export interface ActivityGroup {
  date: string;
  dateLabel: string;
  activities: ActivityData[];
}


const ActivityPage: React.FC = () => {
  const [filteredActivities, setFilteredActivities] = useState<ActivityGroup[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list');

  const {id} = useParams()

 const {data, isLoading, error, refetch} = useFetch(`/projects/columns/tasks/activities/${id}`)

  // Group activities by date
  const groupActivitiesByDate = (activities: ActivityData[]): ActivityGroup[] => {
    const groups: Record<string, ActivityData[]> = {};
    
    activities?.forEach(activity => {
      const date = new Date(activity.createdAt);
      let dateKey: string;
      let dateLabel: string;
      
      if (isToday(date)) {
        dateKey = 'today';
        dateLabel = 'Today';
      } else if (isYesterday(date)) {
        dateKey = 'yesterday';
        dateLabel = 'Yesterday';
      } else {
        dateKey = format(date, 'yyyy-MM-dd');
        dateLabel = format(date, 'MMMM d, yyyy');
      }
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });
    
    return Object.entries(groups).map(([dateKey, groupActivities]) => ({
      date: dateKey,
      dateLabel: groups[dateKey][0] && isToday(new Date(groups[dateKey][0].createdAt)) 
        ? 'Today' 
        : groups[dateKey][0] && isYesterday(new Date(groups[dateKey][0].createdAt))
        ? 'Yesterday'
        : format(new Date(groups[dateKey][0].createdAt), 'MMMM d, yyyy'),
      activities: groupActivities,
    }));
  };

  // Filter activities based on selected filter and search
  useEffect(() => {
  if(data) {
    let filtered = [...data];
    
    // Apply action filter
    if (selectedFilter !== 'all') {
      filtered = filtered?.filter(activity => activity.action === selectedFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered?.filter(activity => 
        activity.user?.name.toLowerCase().includes(query) ||
        activity.project?.name.toLowerCase().includes(query) ||
        activity.task?.title.toLowerCase().includes(query) ||
        activity.action.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (newest first)
    filtered?.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const grouped = groupActivitiesByDate(filtered);
    setFilteredActivities(grouped);
  }
  }, [data, selectedFilter, searchQuery]);

  const handleRefresh = async () => {
    refetch()
  };

  const handleExport = () => {
    // Export functionality
    console.log('Export activities');
  };

  if(isLoading) return

  let commentsCount = data?.filter((d: ActivityData) => d.action === "COMMENT").length || 0
  let statusChangeCount = data?.filter((d: ActivityData) => d.action === "STATUS_CHANGE").length || 0
  let taskUpdateCount = data?.filter((d: ActivityData) => d.action === "TASK_UPDATE").length || 0
  let priorityCount = data?.filter((d: ActivityData) => d.action === "PRIORITY_CHANGE").length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActivityHeader
          onRefresh={handleRefresh}
          onExport={handleExport}
          loading={loading}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          title={data[0]?.task.title || ""}
          details={data[0]?.task.description || ""}
        />
        
        <ActivityFilters
          commentCount={commentsCount}
          totalActivities={data.length || 0}
          statusChangeCount={statusChangeCount}
          taskUpdateCount={taskUpdateCount}
          priorityCount={priorityCount}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="mt-6">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery ? 'Try adjusting your search or filter to find what you\'re looking for.' 
                  : 'Activities will appear here when team members make changes.'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredActivities?.map((group) => (
                <div key={group.date} className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {group.dateLabel}
                    </h3>
                    <div className="ml-4 flex-1 h-px bg-gray-200"></div>
                    <span className="ml-4 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {group.activities.length} activities
                    </span>
                  </div>
                  
                  <div className={`space-y-4 ${viewMode === 'compact' ? 'space-y-3' : ''}`}>
                    {group.activities.map((activity: ActivityData) => (
                      <ActivityCard 
                        key={activity.id}
                        activity={activity}
                        viewMode={viewMode}
                        onViewTask={(taskId) => console.log('View task:', taskId)}
                        onViewProject={(projectId) => console.log('View project:', projectId)}
                        onViewUser={(userId) => console.log('View user:', userId)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;