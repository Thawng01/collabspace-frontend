import { useState, type ChangeEvent } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Plus, SquarePen } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import CustomButton from "../shared/CustomButton";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CalendarPicker } from "./CalendarPicker";
import useFetch from "../../hooks/useFetch";
import type { Label as LabelType, Task, WorkspaceMember } from "../../types";
import { usePost } from "../../hooks/usePost";
import { useUpdate } from "../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

// const status = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];
const priority = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const NewTask = ({
    projectId,
    columnId,

    task,
}: {
    projectId: string;
    columnId: string;
    task?: Task;
}) => {
    const { workspaceId } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedLabel, setselectedLabel] = useState("");
    const [selectedPriority, setSelectedPriority] = useState(
        task?.priority || priority[1]
    );
    const [selectedMember, setSelectedMember] = useState(
        task?.assignee?.id || ""
    );
    const [date, setDate] = useState<Date | undefined>(
        new Date(task?.dueDate ? task.dueDate : new Date()) || new Date()
    );
    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
    });

    const queryClient = useQueryClient();

    const { data: labels } = useFetch(`/labels/${workspaceId}`);
    const { data: members } = useFetch(`/workspaces/members/${projectId}`);

    const {
        mutate: createTask,
        isPending,
        error,
    } = usePost(`/projects/columns/tasks`, () => {
        setOpen(false);
    });
    const {
        mutate: editTask,
        isPending: editing,
        error: editError,
    } = useUpdate(`/projects/columns/tasks/${task?.id}`, () => {
        queryClient.invalidateQueries({
            queryKey: [`/workspaces/members/${projectId}`],
        });
        setOpen(false);
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (task) {
            editTask({
                title: formData.title,
                description: formData.description,
                label: selectedLabel,
                priority: selectedPriority,
                assigneeId: selectedMember,
                dueDate: date,
            });
        } else {
            createTask({
                title: formData.title,
                description: formData.description,
                label: selectedLabel,
                priority: selectedPriority,
                assigneeId: selectedMember,
                columnId,
                dueDate: date,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
                {task ? (
                    <button className="w-full flex items-center ">
                        <SquarePen className="h-4 w-4" />
                        <span className="text-sm font-medium ml-2">Edit</span>
                    </button>
                ) : (
                    <button className="w-full mt-4 flex items-center justify-center space-x-2 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Plus className="h-4 w-4" />
                        <span className="text-sm font-medium">Add Task</span>
                    </button>
                )}
            </DialogTrigger>

            <DialogContent className="bg-white border-0">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-2xl">
                        {task ? "Update Task" : "Create New Task"}
                    </DialogTitle>
                    <DialogDescription className="text-[gray]">
                        {task ? "Update" : " Create"} tasks and assign it to
                        members
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <span className="text-red-600">{error?.response.data}</span>
                )}
                {editError && (
                    <span className="text-red-600">
                        {editError?.response.data}
                    </span>
                )}
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Name</Label>
                        <input
                            className="focus:outline-0 focus:ring-1 border-gray-300 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3"
                            id="title"
                            name="title"
                            placeholder="Task Name"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">
                            Description{" "}
                            <span className="text-[gray]">(Option)</span>
                        </Label>
                        <input
                            className="focus:outline-0 border-gray-300 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3"
                            id="description"
                            name="description"
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-1 flex-col gap-3">
                            <Label htmlFor="status">Label</Label>
                            <Select
                                defaultValue="Select a label"
                                value={selectedLabel}
                                onValueChange={(value) =>
                                    setselectedLabel(value)
                                }
                            >
                                <SelectTrigger className="w-full border-1 py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                                    <SelectValue
                                        defaultValue={selectedLabel}
                                        placeholder="Select a label"
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectGroup>
                                        {labels?.map((label: LabelType) => (
                                            <SelectItem
                                                key={label.id}
                                                value={label.id}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {label.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={selectedPriority}
                                onValueChange={(value) =>
                                    setSelectedPriority(value)
                                }
                            >
                                <SelectTrigger className="w-full border-1 py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                                    <SelectValue
                                        defaultValue={selectedPriority}
                                        placeholder="Select a priority"
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectGroup>
                                        {priority?.map((p) => (
                                            <SelectItem key={p} value={p}>
                                                <div className="flex items-center gap-2">
                                                    {p}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <CalendarPicker date={date} onSelectDate={setDate} />
                        <div className="flex flex-col flex-1 gap-3">
                            <Label htmlFor="assignee">Assignee</Label>
                            <Select
                                // disabled={task ? true : false}

                                value={selectedMember}
                                onValueChange={(value) => {
                                    setSelectedMember(value);
                                }}
                            >
                                <SelectTrigger className="w-full border-1 py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                                    <SelectValue
                                        placeholder={
                                            task
                                                ? task.assignee?.name
                                                : "Select a assignee"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectGroup>
                                        <SelectItem value="no">
                                            Select a assignee
                                        </SelectItem>
                                        {members?.map((m: WorkspaceMember) => (
                                            <>
                                                <SelectItem
                                                    key={m.id}
                                                    value={m.user.id}
                                                >
                                                    <div className=" gap-2">
                                                        <p>{m.user.name}</p>
                                                    </div>
                                                </SelectItem>
                                            </>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="border-gray-300">
                            Cancel
                        </Button>
                    </DialogClose>

                    <CustomButton
                        label={task ? "Update" : "Create"}
                        type="submit"
                        disabled={isPending || editing}
                        onClick={() => handleSubmit()}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NewTask;
