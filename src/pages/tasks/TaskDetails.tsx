import { useState } from "react";

import { format } from "date-fns";
import {
    Calendar,
    User,
    Flag,
    Clock,
    Tag,
    AlertCircle,
    FileText,
    Image,
    Download,
    Trash2,
} from "lucide-react";
import type { Attactment, Priority, TaskLabel, TaskStatus } from "../../types";
import { cn } from "../../lib/utils";
import { useParams } from "react-router";
import CustomButton from "../../components/shared/CustomButton";
import useFetch from "../../hooks/useFetch";
import Comments from "../../components/tasks/comments/Comments";
import ActivityCard from "../../components/tasks/activity/ActivityCard";
import { useUpdate } from "../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
import { priorityOptions, statusOptions } from "../../utils/constant";

export default function TaskDetailsPage() {
    const params = useParams();

    const queryClient = useQueryClient();
    const { data: task, isLoading } = useFetch(
        `/projects/columns/tasks/details/${params.id}`
    );
    const { data: user } = useFetch(`/users/me`);

    const { mutate: updatePriority } = useUpdate(
        `/projects/columns/tasks/update-priority/${params.id}`,
        () => {
            queryClient.invalidateQueries({
                queryKey: [`/projects/columns/tasks/details/${params.id}`],
            });
        }
    );
    const { mutate: updateStatus } = useUpdate(
        `/projects/columns/tasks/update-status/${params.id}`,
        () => {
            queryClient.invalidateQueries({
                queryKey: [`/projects/columns/tasks/details/${params.id}`],
            });
        }
    );
    const { mutate: updateDescription } = useUpdate(
        `/projects/columns/tasks/update-description/${params.id}`,
        () => {
            setIsEditingDescription(false);
            queryClient.invalidateQueries({
                queryKey: [`/projects/columns/tasks/details/${params.id}`],
            });
        }
    );

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedDescription, setEditedDescription] = useState(
        task?.description || ""
    );

    const isOverdue = task?.dueDate && new Date(task?.dueDate) < new Date();

    const handleStatusChange = (newStatus: TaskStatus) => {
        updateStatus({
            status: newStatus,
            userId: user.id,
            projectId: params.projectId,
            columnId: params.columnId,
        });
    };

    const handlePriorityChange = (newPriority: Priority) => {
        updatePriority({
            priority: newPriority,
            projectId: params.projectId,
            userId: user.id,
        });
    };

    const handleSaveDescription = () => {
        updateDescription({
            description: editedDescription,
            userId: user.id,
            projectId: params.projectId,
        });
    };

    const handleDeleteAttachment = (attachmentId: string) => {
        if (confirm("Are you sure you want to delete this attachment?")) {
            // setTask({
            //     ...task,
            //     attachments: task.attachments.filter(
            //         (att) => att.id !== attachmentId
            //     ),
            // });
            // API call would go here
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getFileIcon = (type: string) => {
        if (type.includes("pdf"))
            return <FileText className="w-5 h-5 text-red-500" />;
        if (type.includes("figma"))
            return <Image className="w-5 h-5 text-purple-500" />;
        if (type.includes("image"))
            return <Image className="w-5 h-5 text-green-500" />;
        return <FileText className="w-5 h-5 text-gray-500" />;
    };


    if (isLoading) return;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {task.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Task ID: {task.id}</span>
                                <span>
                                    Created:{" "}
                                    {format(
                                        new Date(task.createdAt),
                                        "MMM d, yyyy"
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <CustomButton label="Edit Task" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Description
                                </h2>
                                {!isEditingDescription && (
                                    <button
                                        onClick={() => {
                                            setIsEditingDescription(true);
                                            setEditedDescription(
                                                task.description || ""
                                            );
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditingDescription ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) =>
                                            setEditedDescription(e.target.value)
                                        }
                                        className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Add a description..."
                                    />
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() =>
                                                setIsEditingDescription(false)
                                            }
                                            className="px-4 py-2 text-gray-700 hover:text-gray-900"
                                        >
                                            Cancel
                                        </button>
                                        <CustomButton
                                            label="Save Changes"
                                            onClick={handleSaveDescription}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="prose max-w-none">
                                    {task.description ? (
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {task.description}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 italic">
                                            No description provided
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                Comments ({task?.comments.length})
                            </h2>
                        </div>

                        <Comments taskId={task.id} />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Task Details
                            </h3>

                            <div className="space-y-6">
                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {statusOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() =>
                                                    handleStatusChange(
                                                        option.value
                                                    )
                                                }
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                                                    task.status === option.value
                                                        ? option.color
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Priority
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {priorityOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() =>
                                                    handlePriorityChange(
                                                        option.value
                                                    )
                                                }
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5",
                                                    task.priority ===
                                                        option.value
                                                        ? option.color
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                )}
                                            >
                                                <Flag className="w-3.5 h-3.5" />
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="inline-block w-4 h-4 mr-2" />
                                        Due Date
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {task.dueDate ? (
                                            <>
                                                <span
                                                    className={cn(
                                                        "font-normal",
                                                        isOverdue
                                                            ? "text-red-600"
                                                            : "text-gray-900"
                                                    )}
                                                >
                                                    {format(
                                                        new Date(task.dueDate),
                                                        "MMM d, yyyy"
                                                    )}
                                                </span>
                                                {isOverdue && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Overdue
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-gray-400">
                                                No due date set
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="inline-block w-4 h-4 mr-2" />
                                        Assignee
                                    </label>
                                    {task.assignee ? (
                                        <div className="flex items-center gap-3">
                                            {task.assignee.avatar ? (
                                                <img
                                                    src={task.assignee.avatar}
                                                    alt={task.assignee.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-blue-600" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-medium text-gray-900">
                                                    {task.assignee.name}
                                                </span>
                                                <p className="text-sm text-gray-500">
                                                    {task.assignee.email}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                            + Assign to someone
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Tag className="inline-block w-4 h-4 mr-2" />
                                        Labels
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {task.labels?.map((l: TaskLabel, index: number) => (
                                            <span
                                                key={l.id+index}
                                                className="px-3 py-1.5 rounded-full text-sm font-medium"
                                                style={{
                                                    backgroundColor: `${l.label.color}20`,
                                                    color: l.label.color,
                                                }}
                                            >
                                                {l.label.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Created
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {format(
                                                new Date(task.createdAt),
                                                "MMM d, yyyy"
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Last Updated
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {format(
                                                new Date(task.updatedAt),
                                                "MMM d, yyyy"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Attachments ({task?.attachments.length})
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {task?.attachments.map(
                                    (attachment: Attactment) => (
                                        <div
                                            key={attachment.id}
                                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                {getFileIcon(
                                                    attachment.fileType
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">
                                                        {attachment.filename}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(
                                                            attachment.fileSize
                                                        )}{" "}
                                                        ·{" "}
                                                        {format(
                                                            new Date(
                                                                attachment.createdAt
                                                            ),
                                                            "MMM d"
                                                        )}{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-1 text-gray-400 hover:text-blue-600">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteAttachment(
                                                            attachment.id
                                                        )
                                                    }
                                                    className="p-1 text-gray-400 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <ActivityCard taskId={task.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
