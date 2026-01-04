import { useParams } from "react-router";
import { useState, useMemo } from "react";

import { Search, Grid, List, Calendar } from "lucide-react";
import type { Project} from "../../types";
import { CreateProjectModal } from "../../components/projects/CreateProjectModal";
import { ProjectSort } from "../../components/projects/ProjectSort";
import { ProjectCard } from "../../components/projects/ProjectCard";
import useFetch from "../../hooks/useFetch";


export const WorkSpaceDetail = () => {
   
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"name" | "createdAt" | "updatedAt">(
        "name"
    );
const {id,name} = useParams()
    const { data: projects } = useFetch(`/projects/${id}`);

    const filteredProjects = useMemo(() => {
        let filtered = projects || [];

        if (searchQuery) {
            filtered = filtered?.filter(
                (project: Project) =>
                    project.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "createdAt":
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                case "updatedAt":
                    return (
                        new Date(b.updatedAt).getTime() -
                        new Date(a.updatedAt).getTime()
                    );
                default:
                    return 0;
            }
        });

        return filtered;
    }, [projects, searchQuery, sortBy]);

    const getProgressColor = (project: Project) => {
        const totalColumns = project.columns.length;
        const completedColumns = project.columns.filter(
            (col) =>
                col.title?.toLowerCase().includes("done") ||
                col.title?.toLowerCase().includes("completed")
        ).length;

        const progress =
            totalColumns > 0 ? (completedColumns / totalColumns) * 100 : 0;

        if (progress >= 80) return "bg-green-500";
        if (progress >= 50) return "bg-blue-500";
        if (progress >= 25) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {name}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage and track all your projects
                        </p>
                    </div>

                    <CreateProjectModal />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="relative flex-1 w-full lg:w-auto">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <ProjectSort sort={sortBy} onSort={setSortBy} />

                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 ${
                                    viewMode === "grid"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600"
                                }`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 ${
                                    viewMode === "list"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600"
                                }`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                            : "space-y-4"
                    }
                >
                    {filteredProjects.map((project: Project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            viewMode={viewMode}
                            progressColor={getProgressColor(project)}
                            // selectedWorkspace={selectedWorkspace}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No projects found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchQuery
                                    ? "Try adjusting your search or filter criteria"
                                    : "Get started by creating your first project"}
                            </p>
                            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                                Create Project
                            </button> */}

                            <CreateProjectModal />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
