// components/ProjectCard.tsx
import React from "react";

import { Calendar, Folder, Activity } from "lucide-react";
import type { Project } from "../../types";
import { ProjectAction } from "./ProjectAction";
import { Link } from "react-router";

interface ProjectCardProps {
    project: Project;
    viewMode: "grid" | "list";
    progressColor: string;
    selectedWorkspace?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    viewMode,
    progressColor,
    selectedWorkspace,
}) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const totalColumns = project.columns.length;
    const completedColumns = project.columns.filter(
        (col) =>
            col.title.toLowerCase().includes("done") ||
            col.title.toLowerCase().includes("completed")
    ).length;
    const progress =
        totalColumns > 0
            ? Math.round((completedColumns / totalColumns) * 100)
            : 0;

    if (viewMode === "list") {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{
                                backgroundColor: project.color || "#3B82F6",
                            }}
                        >
                            {project.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <Link
                                    to={`/${project.name}/${project.workspaceId}/projects/columns/${project.id}`}
                                    className="font-semibold text-gray-900 text-lg"
                                >
                                    {project.name}
                                </Link>
                                <span
                                    className="text-xs px-2 py-1 rounded-full text-white"
                                    style={{
                                        backgroundColor:
                                            project.color || "#6B7280",
                                    }}
                                >
                                    {project.workspace.name}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Folder size={16} />
                                    <span>{totalColumns} columns</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Activity size={16} />
                                    <span>
                                        {project.activities.length} activities
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    <span>
                                        Updated {formatDate(project.updatedAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-32">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${progressColor}`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <ProjectAction
                            project={project}
                            // selectedWorkspace={selectedWorkspace}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div
                className="h-2 rounded-t-xl"
                style={{ backgroundColor: project.color || "#3B82F6" }}
            ></div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <Link
                            to={`/${project.name}/${project.workspaceId}/projects/columns/${project.id}`}
                            className="font-bold text-gray-900 text-lg mb-1 block"
                        >
                            {project.name}
                        </Link>
                        <span
                            className="text-xs px-2 py-1 rounded-full text-white inline-block"
                            style={{
                                backgroundColor: project.color || "#6B7280",
                            }}
                        >
                            {project.workspace.name}
                        </span>
                    </div>
                    <ProjectAction
                        project={project}
                        selectedWorkspace={selectedWorkspace}
                    />
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {project.description || "No description provided"}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {totalColumns}
                        </div>
                        <div className="text-xs text-gray-500">Columns</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {project.activities.length}
                        </div>
                        <div className="text-xs text-gray-500">Activities</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {completedColumns}
                        </div>
                        <div className="text-xs text-gray-500">Completed</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Project Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full ${progressColor} transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Updated {formatDate(project.updatedAt)}</span>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                        Created {formatDate(project.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};
