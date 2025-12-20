// components/ProfileComponent.tsx
import React from "react";

// types/user.ts
export interface User {
    id: string;
    email: string;
    name?: string;
    password: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    ownedWorkspaces: Workspace[];
    workspaceMemberships: WorkspaceMember[];
    assignedTasks: Task[];
    comments: Comment[];
    notifications: Notification[];
    Activity: Activity[];
}

export interface Workspace {
    id: string;
    name: string;
    // Add other workspace fields as needed
}

export interface WorkspaceMember {
    id: string;
    // Add other membership fields
}

export interface Task {
    id: string;
    title: string;
    // Add other task fields
}

export interface Notification {
    id: string;
    title: string;
    read: boolean;
    createdAt: Date;
}

export interface Activity {
    id: string;
    action: string;
    timestamp: Date;
    details?: string;
}

interface ProfileComponentProps {
    user: User;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user }) => {
    const stats = [
        {
            label: "Owned Workspaces",
            value: user.ownedWorkspaces.length,
            icon: "🏢",
        },
        {
            label: "Assigned Tasks",
            value: user.assignedTasks.length,
            icon: "✅",
        },
        {
            label: "Comments",
            value: user.comments.length,
            icon: "💬",
        },
        {
            label: "Unread Notifications",
            value: user.notifications.filter((n) => !n.read).length,
            icon: "🔔",
        },
    ];

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getInitials = (name?: string, email?: string) => {
        if (name) {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
        }
        if (email) return email[0].toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage your personal information and account settings
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col items-center">
                                {/* Avatar */}
                                <div className="relative">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name || "User avatar"}
                                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="text-2xl font-bold text-white">
                                                {getInitials(
                                                    user.name,
                                                    user.email
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>

                                {/* User Info */}
                                <div className="mt-6 text-center">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {user.name || "No Name Set"}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {user.email}
                                    </p>
                                    <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                                        <span>
                                            Member since{" "}
                                            {formatDate(user.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-4 text-center"
                                    >
                                        <div className="text-2xl mb-1">
                                            {stat.icon}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Account Details
                            </h3>
                            <dl className="space-y-3">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        User ID
                                    </dt>
                                    <dd className="text-sm text-gray-900 font-mono">
                                        {user.id}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Last Updated
                                    </dt>
                                    <dd className="text-sm text-gray-900">
                                        {formatDate(user.updatedAt)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Account Status
                                    </dt>
                                    <dd className="text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Right Column - Activity and Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Workspaces Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Owned Workspaces
                                </h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {user.ownedWorkspaces.length}
                                </span>
                            </div>

                            {user.ownedWorkspaces.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.ownedWorkspaces
                                        .slice(0, 4)
                                        .map((workspace) => (
                                            <div
                                                key={workspace.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white font-semibold text-sm">
                                                            {workspace.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {workspace.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            Workspace
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-4xl mb-2">
                                        🏢
                                    </div>
                                    <p className="text-gray-500">
                                        No workspaces owned
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Recent Activity
                            </h3>

                            {user.Activity.length > 0 ? (
                                <div className="space-y-4">
                                    {user.Activity.slice(0, 5).map(
                                        (activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-purple-600 text-sm">
                                                        ⚡
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-900">
                                                        {activity.action}
                                                    </p>
                                                    {activity.details && (
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {activity.details}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {formatDate(
                                                            activity.timestamp
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-4xl mb-2">
                                        📊
                                    </div>
                                    <p className="text-gray-500">
                                        No recent activity
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Notifications Preview */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Notifications
                                </h3>
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {
                                        user.notifications.filter(
                                            (n) => !n.read
                                        ).length
                                    }{" "}
                                    unread
                                </span>
                            </div>

                            {user.notifications.length > 0 ? (
                                <div className="space-y-3">
                                    {user.notifications
                                        .slice(0, 3)
                                        .map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                                                    notification.read
                                                        ? "border-gray-100 bg-gray-50"
                                                        : "border-blue-100 bg-blue-50"
                                                }`}
                                            >
                                                <div
                                                    className={`w-2 h-2 rounded-full ${
                                                        notification.read
                                                            ? "bg-gray-300"
                                                            : "bg-blue-500"
                                                    }`}
                                                ></div>
                                                <div className="flex-1 min-w-0">
                                                    <p
                                                        className={`text-sm ${
                                                            notification.read
                                                                ? "text-gray-600"
                                                                : "text-gray-900 font-medium"
                                                        }`}
                                                    >
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {formatDate(
                                                            notification.createdAt
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">
                                        No notifications
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
