import React from 'react';
import { type Project } from '../../types';
import { 
  FolderKanban, 
  Users, 
  Calendar, 
  ArrowRight, 
  AlertCircle,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { format } from 'date-fns';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router';

const ProjectsOverview = () => {
  const { 
    data: projects, 
    isLoading, 
    error, 
    refetch 
  } = useFetch("/dashboard/projects");

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-200 rounded w-8" />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-1" />
              <div className="h-3 bg-gray-200 rounded w-8" />
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-1" />
              <div className="h-3 bg-gray-200 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <FolderOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Get started by creating your first project to organize tasks and collaborate with your team.
      </p>
      {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Create Project
      </button> */}
    </div>
  );

  // Error state
  const renderErrorState = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load projects</h3>
      <p className="text-gray-500 mb-6">
        {error?.message || 'Something went wrong while loading projects.'}
      </p>
      <button
        onClick={() => refetch()}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center mx-auto"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </button>
    </div>
  );

  // Projects grid
  const renderProjectsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects?.map((project: Project) => {
      
        
        return (
          <div 
            key={project.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:border-blue-200 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <FolderKanban 
                    className="w-5 h-5" 
                    style={{ color: project.color || '#3B82F6' }}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{project.name?.length > 20 ? project.name.slice(0,20) + "..." : project.name}</h3>
                  <p className="text-xs text-gray-500 truncate">
                    {project.description && project?.description?.length > 35 ? project.description?.slice(0, 35) +"..." : project.description || 'No description'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className='items-center flex'>
              <div className={` px-5 py-1 rounded-full text-sm mb-4`} style={{ backgroundColor: `${project.color}20` }}>
                <span className="text-white font-medium" style={{color: project.color}}>{project.workspace.name?.length > 30 ? project.workspace.name.slice(0,30) + "...": project.workspace.name}</span>
              </div>
              </div>
          
            
            <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex items-center" title="Team members">
                <Users className="w-4 h-4 mr-1.5 text-gray-400" />
                <span>{project.workspace?.members?.length || 0}</span>
              </div>
              <div className="flex items-center" title="Created date">
                <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                <span>
                  {project.createdAt ? format(new Date(project.createdAt), 'MMM d, yyyy') : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Projects Overview</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isLoading
              ? 'Loading projects...' 
              : error 
                ? 'Failed to load projects' 
                : projects.length > 0 
                  ? `${projects.length} project${projects.length !== 1 ? 's' : ''} in total` 
                  : 'No projects available'
            }
          </p>
        </div>
        {!isLoading && !error && projects.length > 0 && (
          <Link to={`/projects`} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center transition-colors">
            View all projects
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>
      
      {isLoading ? (
        renderSkeleton()
      ) : error ? (
        renderErrorState()
      ) : projects.length ===0 ? (
        renderEmptyState()
      ) : (
        renderProjectsGrid()
      )}
    </div>
  );
};

export default ProjectsOverview;