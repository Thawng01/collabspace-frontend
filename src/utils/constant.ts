import type { Priority, TaskStatus } from "../types";

 export const statusOptions: Array<{
        value: TaskStatus;
        label: string;
        color: string;
    }> = [
        {
            value: "BACKLOG",
            label: "Backlog",
            color: "bg-gray-100 text-skyblue-600",
        },
        { value: "TODO", label: "To Do", color: "bg-blue-100 text-blue-600" },
        {
            value: "IN_PROGRESS",
            label: "In Progress",
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            value: "IN_REVIEW",
            label: "Review",
            color: "bg-purple-100 text-purple-800",
        },
        { value: "DONE", label: "Done", color: "bg-green-100 text-green-600" },
    ];

    export const priorityOptions: Array<{
        value: Priority;
        label: string;
        color: string;
    }> = [
        { value: "LOW", label: "Low", color: "bg-purple-100 text-purple-600" },
        {
            value: "MEDIUM",
            label: "Medium",
            color: "bg-blue-100 text-blue-800",
        },
        {
            value: "HIGH",
            label: "High",
            color: "bg-orange-100 text-orange-700",
        },
        { value: "URGENT", label: "Urgent", color: "bg-red-100 text-red-700" },
    ];