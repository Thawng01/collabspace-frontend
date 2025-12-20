import React, { useState, useMemo } from "react";

import type { Workspace, WorkspaceStats } from "../../types";
import WorkspaceItem from "../../components/workspaces/WorkspaceItem";
import { CreateWorkspaceModal } from "../../components/workspaces/CreateWorkspaceModal";
import useFetch from "../../hooks/useFetch";

import { SortSelect } from "../../components/workspaces/SortDropdown";
import WorkspacesStats from "../../components/workspaces/WorkspacesStats";
import CreateLabel from "../../components/workspaces/CreateLabel";

const WorkspacePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"name" | "updated" | "members">(
        "updated"
    );

    const { data: workspaces, isLoading } = useFetch("/workspaces");

    // Calculate stats
    const stats: WorkspaceStats = useMemo(
        () => ({
            totalProjects: workspaces?.reduce(
                (sum: number, ws: any) => sum + ws._count.projects,
                0
            ),
            totalMembers: workspaces?.reduce(
                (sum: number, ws: any) => sum + ws._count.members,
                0
            ),
        }),
        [workspaces]
    );

    const filteredAndSortedWorkspaces = useMemo(() => {
        let filtered = workspaces || [];

        // Apply search filter
        if (searchTerm.trim()) {
            const lowercasedSearch = searchTerm.toLowerCase();
            filtered = filtered?.filter(
                (workspace: Workspace) =>
                    workspace.name.toLowerCase().includes(lowercasedSearch) ||
                    workspace.description
                        ?.toLowerCase()
                        .includes(lowercasedSearch) ||
                    workspace.members.some((member) =>
                        member.user.name
                            .toLowerCase()
                            .includes(lowercasedSearch)
                    )
            );
        }

        // Apply sorting
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "members":
                    return b.members.length - a.members.length;
                case "updated":
                default:
                    return (
                        new Date(b.updatedAt).getTime() -
                        new Date(a.updatedAt).getTime()
                    );
            }
        });

        return filtered;
    }, [workspaces, searchTerm, sortBy]);

    if (isLoading) return;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                Workspaces
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">
                                Collaborate and manage your projects efficiently
                            </p>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center gap-4">
                            <CreateWorkspaceModal />
                            <CreateLabel />
                        </div>
                    </div>

                    <WorkspacesStats
                        totalWorkspaces={workspaces?.length || 0}
                        totalMembers={stats.totalMembers}
                        totalProjects={stats.totalProjects}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search workspaces by name, description, or members..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <SortSelect sort={sortBy} onSort={setSortBy} />

                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-colors duration-200 ${
                                        viewMode === "grid"
                                            ? "bg-white shadow-sm text-blue-600"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-colors duration-200 ${
                                        viewMode === "list"
                                            ? "bg-white shadow-sm text-blue-600"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredAndSortedWorkspaces.length > 0 ? (
                    <div
                        className={`${
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4"
                                : "space-y-4"
                        }`}
                    >
                        {filteredAndSortedWorkspaces.map(
                            (workspace: Workspace) => (
                                <WorkspaceItem
                                    key={workspace.id}
                                    workspace={workspace}
                                />
                            )
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-12 h-12 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No workspaces found
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            {searchTerm
                                ? `No workspaces match your search for "${searchTerm}". Try adjusting your search terms.`
                                : "Get started by creating your first workspace to organize your projects and team collaboration."}
                        </p>
                        <CreateWorkspaceModal />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkspacePage;
