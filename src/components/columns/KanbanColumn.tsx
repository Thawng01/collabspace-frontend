// components/KanbanColumn.tsx
import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type Column as ColumnType, type Task } from "../../types/index";

import { Plus, AlertCircle } from "lucide-react";
import KanbanTask from "./KanbanTask";

import ColumnAction from "./ColumnAction";
import NewTask from "../tasks/NewTask";
import { useParams } from "react-router";

interface KanbanColumnProps {
    column: ColumnType;
    tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks }) => {
    const [showMenu, setShowMenu] = useState(false);
    const { id } = useParams();

    const { isOver, setNodeRef } = useDroppable({
        id: column.id,
        data: {
            type: "column",
            column,
            accepts: ["task"],
        },
    });

    const taskIds = tasks.map((task) => task.id);
    const isOverLimit = column.wipLimit && tasks.length > column.wipLimit;

    return (
        <div
            ref={setNodeRef}
            className={`
        flex-shrink-0 w-80 bg-gray-50 rounded-xl p-4
        transition-all duration-200
        ${isOver ? "ring-2 ring-blue-400 bg-blue-50" : ""}
        ${
            isOverLimit
                ? "border-2 border-red-200 bg-red-50"
                : "border border-gray-200"
        }
      `}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900">
                        {column.title}
                    </h3>
                    <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full font-medium">
                        {tasks.length}
                        {column.wipLimit && `/${column.wipLimit}`}
                    </span>
                    {isOverLimit && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                </div>

                <ColumnAction column={column} />
            </div>

            <div className="space-y-3 min-h-[200px]">
                <SortableContext
                    items={taskIds}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks?.map((task: Task) => (
                        <KanbanTask
                            key={task.id}
                            task={task}
                            projectId={column.projectId}
                        />
                    ))}
                </SortableContext>

                {tasks?.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Plus className="h-5 w-5" />
                        </div>
                        <p className="text-sm">No tasks yet</p>
                        <p className="text-xs mt-1">
                            Drag tasks here or create new ones
                        </p>
                    </div>
                )}
            </div>

            <NewTask projectId={id!} columnId={column.id} />

            {showMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    );
};

export default KanbanColumn;
