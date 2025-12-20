import React, { type JSX } from "react";
import { format } from "date-fns";
import {
    Calendar,
    MessageSquare,
    Paperclip,
    MoreVertical,
    User,
    Flag,
    Clock,
} from "lucide-react";
// import { TaskWithDetails, Priority, TaskStatus } from "@/types/task";
import { cn } from "../../lib/utils";
import type { Priority, TaskStatus, User as UserType } from "../../types";
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: Priority;
    dueDate?: Date;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    columnId: string;
    assignee?: UserType;
    assigneeId?: string;
}

export interface TaskWithDetails extends Task {
    comments: number;
    labels: any[];
    attachments: number;
}

interface TaskCardProps {
    task: TaskWithDetails;
    onClick: () => void;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
    BACKLOG: { label: "Backlog", color: "bg-gray-100 text-gray-800" },
    TODO: { label: "To Do", color: "bg-blue-100 text-blue-800" },
    IN_PROGRESS: {
        label: "In Progress",
        color: "bg-yellow-100 text-yellow-800",
    },
    IN_REVIEW: { label: "Review", color: "bg-purple-100 text-purple-800" },
    DONE: { label: "Done", color: "bg-green-100 text-green-800" },
};

const priorityConfig: Record<
    Priority,
    { label: string; color: string; icon: JSX.Element }
> = {
    LOW: {
        label: "Low",
        color: "bg-gray-100 text-gray-800",
        icon: <Flag className="w-3 h-3" />,
    },
    MEDIUM: {
        label: "Medium",
        color: "bg-blue-100 text-blue-800",
        icon: <Flag className="w-3 h-3" />,
    },
    HIGH: {
        label: "High",
        color: "bg-orange-100 text-orange-800",
        icon: <Flag className="w-3 h-3" />,
    },
    URGENT: {
        label: "Urgent",
        color: "bg-red-100 text-red-800",
        icon: <Flag className="w-3 h-3 fill-red-800" />,
    },
};

export function TaskCard({ task, onClick }: TaskCardProps) {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
    const status = statusConfig[task.status];
    const priority = priorityConfig[task.priority];

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                    {task.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="flex items-center gap-2 mb-3">
                <span
                    className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        status.color
                    )}
                >
                    {status.label}
                </span>
                <span
                    className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
                        priority.color
                    )}
                >
                    {priority.icon}
                    {priority.label}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    {task.dueDate && (
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span
                                className={
                                    isOverdue ? "text-red-600 font-medium" : ""
                                }
                            >
                                {format(new Date(task.dueDate), "MMM d")}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{task.comments}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Paperclip className="w-4 h-4" />
                        <span>{task.attachments}</span>
                    </div>
                </div>

                {task.assignee && (
                    <div className="flex items-center gap-2">
                        {task.assignee.avatar ? (
                            <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className="w-6 h-6 rounded-full"
                            />
                        ) : (
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
