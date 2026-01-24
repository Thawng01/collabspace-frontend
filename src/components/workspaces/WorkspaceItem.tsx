import React, { useState } from "react";
import type { Label, Workspace } from "../../types";
import { Action } from "./Action";
import { Link } from "react-router";
import MemberList from "./MemberList";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

const formatMemberCount = (count: number) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};
interface WorkspaceItemProps {
  workspace: Workspace;
}

const WorkspaceItem: React.FC<WorkspaceItemProps> = ({ workspace }) => {
  const { data: user } = useFetch("/users/me");
  const getRoleColor = (role: string) => {
    const colors = {
      OWNER: "bg-purple-100 text-purple-800",
      ADMIN: "bg-blue-100 text-blue-800",
      MEMBER: "bg-green-100 text-green-800",
      VIEWER: "bg-gray-100 text-gray-800",
    };
    return colors[role as keyof typeof colors] || colors.VIEWER;
  };

  const filteredMember = workspace.members?.filter(
    (member) => member.user.id === user?.id,
  );

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 hover:border-blue-200">
      <div className="flex items-start justify-between mb-4">
        <Link
          to={`/workspace/${workspace.name}/${workspace.id}`}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {workspace?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {workspace?.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                  filteredMember[0].role.name,
                )}`}
              >
                {filteredMember[0].role.name}
              </span>
            </div>
          </div>
        </Link>

        <Action workspace={workspace} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{workspace._count.projects} projects</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>

            <div className="flex items-center cursor-pointer">
              <div className="flex -space-x-2">
                {workspace.labels.length > 0 &&
                  workspace.labels.slice(0, 4).map((label: Label) => (
                    <div key={label.id} className="relative group/member">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-sm"
                        title={`${label.name}`}
                        style={{
                          background: label.color,
                        }}
                      >
                        {label.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute bottom-full mb-2 left-1/3 transform -translate-x-1/2 hidden group-hover/member:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
                        {label.name}
                      </div>
                    </div>
                  ))}
                {workspace.labels.length > 4 && (
                  <button
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium transition-colors"
                    title={`View all ${workspace.labels.length} members`}
                  >
                    +{workspace.labels.length - 4}
                  </button>
                )}
              </div>
              <span className="text-sm text-gray-500 ml-3">
                {formatMemberCount(workspace.labels.length)} labels
              </span>
            </div>

            {/* <span>{workspace.labels.length} labels</span> */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <MemberList workspace={workspace} />

        <div className="text-xs text-gray-400 flex items-center space-x-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Updated {new Date(workspace.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceItem;
