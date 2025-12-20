import { format } from "date-fns";
import {
    Activity,
    ArrowUpRight,
    CheckSquare,
    Flag,
    MessageSquare,
    Paperclip,
    User,
    AlertCircle,
    RefreshCw,
} from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import type { Activity as ActivityType } from "../../../types";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { cn } from "../../../lib/utils"; // Assuming you have a cn utility

const getActivityIcon = (type: ActivityType["action"]) => {
    switch (type) {
        case "STATUS_CHANGE":
            return <CheckSquare className="w-4 h-4 text-blue-500" />;
        case "ASSIGNEE_CHANGE":
            return <User className="w-4 h-4 text-green-500" />;
        case "PRIORITY_CHANGE":
            return <Flag className="w-4 h-4 text-orange-500" />;
        case "COMMENT":
            return <MessageSquare className="w-4 h-4 text-purple-500" />;
        case "ATTACHMENT":
            return <Paperclip className="w-4 h-4 text-gray-500" />;
        default:
            return <Activity className="w-4 h-4 text-gray-500" />;
    }
};

const getActivityAction = (type: ActivityType["action"]) => {
    switch (type) {
        case "STATUS_CHANGE":
            return "changed status";
        case "ASSIGNEE_CHANGE":
            return "changed assignee";
        case "PRIORITY_CHANGE":
            return "changed priority";
        case "COMMENT":
            return "commented";
        case "ATTACHMENT":
            return "added an attachment";
        default:
            return "updated task";
    }
};

interface ActivityCardProps {
    taskId: string;
    className?: string;
}

const ActivityCard = ({ taskId, className }: ActivityCardProps) => {
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const {
        data: activities,
        isLoading: isActivitiesLoading,
        error: activitiesError,
        refetch: refetchActivities,
    } = useFetch(`/projects/columns/tasks/activities/recent/${taskId}`);

    const {
        data: user,
        isLoading: isUserLoading,
        error: userError,
    } = useFetch(`/users/me`);

    // Handle refetch on component mount or when taskId changes
    useEffect(() => {
        refetchActivities();
    }, [taskId, refetchActivities]);

    const handleRetry = () => {
        refetchActivities();
    };

    const toggleAutoRefresh = () => {
        setShouldRefetch(!shouldRefetch);
    };

    // Loading state
    if (isActivitiesLoading || isUserLoading) {
        return (
            <div
                className={cn(
                    "bg-white rounded-xl border border-gray-200 p-6",
                    className
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Activity className="inline-block w-5 h-5 mr-2" />
                        Activity
                    </h3>
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex gap-3 animate-pulse">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                            </div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (activitiesError || userError) {
        return (
            <div
                className={cn(
                    "bg-white rounded-xl border border-gray-200 p-6",
                    className
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Activity className="inline-block w-5 h-5 mr-2" />
                        Activity
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-gray-600 mb-2">
                        Failed to load activity. Please try again.
                    </p>
                    <button
                        onClick={handleRetry}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (!activities || activities.length === 0) {
        return (
            <div
                className={cn(
                    "bg-white rounded-xl border border-gray-200 p-6",
                    className
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Activity className="inline-block w-5 h-5 mr-2" />
                        Activity
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Activity className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-1">No activity yet</p>
                    <p className="text-sm text-gray-400">
                        Actions and comments will appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "bg-white rounded-xl border border-gray-200 p-6",
                className
            )}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Activity className="inline-block w-5 h-5 mr-2" />
                        Activity
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    {activities.length > 2 && (
                        <Link
                            to={`/tasks/${taskId}/activity`}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                            <span className="text-xs font-medium">
                                View All
                            </span>
                            <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    )}
                </div>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {activities.map((activity: ActivityType) => {
                    const isCurrentUser = activity.user.id === user?.id;

                    return (
                        <div
                            key={activity.id}
                            className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                        isCurrentUser
                                            ? "bg-blue-50"
                                            : "bg-gray-100"
                                    )}
                                >
                                    {getActivityIcon(activity.action)}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                    <span
                                        className={cn(
                                            "font-medium",
                                            isCurrentUser && "text-blue-600"
                                        )}
                                    >
                                        {isCurrentUser
                                            ? "You"
                                            : activity.user?.name ||
                                              "Unknown User"}
                                    </span>{" "}
                                    <span className="text-gray-600">
                                        {getActivityAction(activity.action)}
                                    </span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <time
                                        className="text-xs text-gray-500"
                                        dateTime={new Date(
                                            activity.createdAt
                                        ).toISOString()}
                                    >
                                        {format(
                                            new Date(activity.createdAt),
                                            "MMM d, h:mm a"
                                        )}
                                    </time>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ActivityCard;
