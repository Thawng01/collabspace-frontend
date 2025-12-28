// components/KanbanBoard.tsx
import { useEffect, useState } from "react";
import {
    DndContext,
    type DragEndEvent,
    type DragOverEvent,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Column, Task } from "../../types";
import KanbanColumn from "./KanbanColumn";
import { NewColumn } from "./NewColumn";
import useFetch from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import { useParams } from "react-router";

const KanbanBoard = ({ projectId }: { projectId: string }) => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [activeTask, setActiveTask] = useState<any | null>(null);

   const {name} = useParams()

    const { data: columns, isLoading } = useFetch(
        `/projects/columns/${projectId}`
    );

    const { data } = useFetch(`/projects/columns/tasks/index/${projectId}`);

    const { mutate: updateTask, error} = useUpdate(
        "/projects/columns/tasks/update-task"
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    useEffect(() => {
        if (data) setTasks(data);
    }, [data]);

    const getColumnTasks = (columnId: string) => {
        return tasks
            ?.filter((task: Task) => task.columnId === columnId)
            .sort((a: any, b: any) => a.order - b.order);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks?.find((t: Task) => t.id === active.id);
        setActiveTask(task || null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find the tasks and columns
        const activeTask = tasks.find((t: Task) => t.id === activeId);
        const overColumn = columns?.find((c: Column) => c.id === overId);

        if (!activeTask || !overColumn) return;

        // If dragging over a different column
        if (activeTask.columnId !== overColumn.id) {
            setTasks(
                tasks?.map((task) =>
                    task.id === activeId
                        ? { ...task, columnId: overColumn.id }
                        : task
                )
            );
  updateTask({ columnId: overColumn.id, taskId: activeId });
          
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveTask(null);
            return;
        }

        // Handle task reordering within same column
        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId !== overId) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);
                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        setActiveTask(null);
    };

    const sortedColumns = columns?.sort(
        (a: Task, b: Task) => a.order - b.order
    );

    if (isLoading) return;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                    {name}
                    </h1>
                    <p className="text-gray-600">
                        Manage your project tasks efficiently
                    </p>
                </div>
                <NewColumn projectId={projectId} />
            </div>

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 flex-wrap overflow-x-auto pb-6">
                    <SortableContext
                        items={columns?.map((c: Column) => c.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        {sortedColumns?.map((column: Column) => (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                tasks={getColumnTasks(column.id)}
                            />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
