// components/KanbanTask.tsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    MoreHorizontal,
    Calendar,
    User,
    MessageSquare,
    Paperclip,
    Eye,
} from "lucide-react";
import type { Task } from "../../types";
import { TaskDelete } from "../tasks/TaskDelete";
import NewTask from "../tasks/NewTask";
import { Link } from "react-router";

interface KanbanTaskProps {
    task: Task;
    projectId: string;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({ task, projectId }) => {
    const [showMenu, setShowMenu] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "task",
            task,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getPriorityColor = (priority: Task["priority"]) => {
        switch (priority) {
            case "URGENT":
                return "bg-red-500";
            case "HIGH":
                return "bg-orange-500";
            case "MEDIUM":
                return "bg-yellow-500";
            case "LOW":
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    };

    const formatDueDate = (date: Date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (new Date(date).toDateString() === today.toDateString()) {
            return "Today";
        } else if (new Date(date).toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        } else {
            return new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    };

    const isOverdue = task.dueDate && new Date() > task.dueDate;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`
        bg-white rounded-lg border border-gray-200 p-3 shadow-sm
        cursor-grab active:cursor-grabbing
        ${
            isDragging
                ? "opacity-50 shadow-lg rotate-2 scale-105"
                : "hover:shadow-md"
        }
        transition-all duration-200
        group
      `}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center justify-between space-x-2 flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight truncate">
                        {task.title}
                    </h4>

                    <div className="flex items-center ">
                        <div
                            className={`w-3 h-3 rounded-full flex-shrink-0 mr-2 ${getPriorityColor(
                                task.priority
                            )}`}
                            title={`${task.priority} priority`}
                        />
                        <p className="text-[10px]">{task.priority}</p>
                    </div>
                </div>

                <div className="relative flex-shrink-0 ml-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            <Link
                                to={`/projects/${projectId}/columns/${task.columnId}/tasks/${task.id}`}
                                className="flex items-center py-2 px-6 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                <p>View </p>
                            </Link>
                            <div className="py-2 px-6 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                <NewTask
                                    task={task}
                                    projectId={projectId}
                                    columnId=""
                                />
                            </div>

                            <div className="justify-center items-center flex text-red-600 hover:bg-red-50 py-2 px-6">
                                <TaskDelete taskId={task.id} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {task.description && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            {task.labels && task.labels.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {task.labels.map((label) => (
                        <span
                            key={label.id}
                            className="px-2 py-1 text-xs rounded-full font-medium"
                            style={{
                                backgroundColor: `${label.color}20`,
                                color: label.color,
                                border: `1px solid ${label.color}40`,
                            }}
                        >
                            {label.name}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-3">
                    {task.dueDate && (
                        <div
                            className={`flex items-center space-x-1 text-xs ${
                                isOverdue ? "text-red-600" : "text-gray-500"
                            }`}
                        >
                            <Calendar className="h-3 w-3" />
                            <span>{formatDueDate(task.dueDate)}</span>
                        </div>
                    )}

                    {task.assignee && (
                        <div className="flex items-center space-x-1 text-xs">
                            <User className="h-3 w-3" />
                            <span className="truncate max-w-20">
                                {task.assignee.name}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {task.commentsCount && task.commentsCount > 0 && (
                        <div className="flex items-center space-x-1 text-xs">
                            <MessageSquare className="h-3 w-3" />
                            <span>{task.commentsCount}</span>
                        </div>
                    )}

                    {task.attachmentsCount && task.attachmentsCount > 0 && (
                        <div className="flex items-center space-x-1 text-xs">
                            <Paperclip className="h-3 w-3" />
                            <span>{task.attachmentsCount}</span>
                        </div>
                    )}
                </div>
            </div>

            {showMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    );
};

export default KanbanTask;
