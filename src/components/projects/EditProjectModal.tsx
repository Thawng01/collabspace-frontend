import { useState, type ChangeEvent, type FormEvent } from "react";
import CustomButton from "../shared/CustomButton";
import { Button } from "../ui/button";
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
import { Label } from "../ui/label";
import { usePost } from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import type { Project, Workspace } from "../../types";
import { useUpdate } from "../../hooks/useUpdate";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import ColorPicker from "./ColorPicker";

export function CreateProjectModal({ project }: { project?: Project }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: project?.name || "",
        description: project?.description || "",
        color: project?.color,
    });

    const [selectedWorkspace, setSelectedWorkspace] = useState(
        project?.workspaceId || ""
    );

    const { data: workspaces } = useFetch("/workspaces");

    const queryClient = useQueryClient();
    // const { data: user } = useFetch("/users/me");
    const { mutate, isPending } = usePost("/projects", () => {
        queryClient.invalidateQueries({ queryKey: ["/projects"] });
        setOpen(false);
    });

    const { mutate: updateItem, isPending: updating } = useUpdate(
        `/projects/${project?.id}`,
        () => {
            queryClient.invalidateQueries({ queryKey: ["/projects"] });
            setOpen(false);
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleColorChange = (color: string) => {
        setFormData((prev) => ({ ...prev, color }));
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate({
            name: formData.name,
            description: formData.description,
            color: formData.color,
            workspaceId: selectedWorkspace,
        });
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        updateItem({
            name: formData.name,
            description: formData.description,
            color: formData.color,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {workspace ? (
                    <button className="flex items-center w-full py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <svg
                            className="w-4 h-4 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit Workspace
                    </button>
                ) : (
                    <CustomButton label="New Project" Icon={Plus} />
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-0">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-2xl">
                        {workspace ? "Update" : "Create"} Your New Workspace
                    </DialogTitle>
                    <DialogDescription className="text-[gray]">
                        {workspace ? "Update" : "Create"} your space and start
                        your journey
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={workspace ? handleUpdate : handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <input
                                className="focus:outline-0 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3 border-gray-300"
                                id="name-1"
                                name="name"
                                placeholder="Project Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">
                                Description{" "}
                                <span className="text-[gray]">(Optional)</span>
                            </Label>
                            <input
                                className="focus:outline-0 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3 border-gray-300"
                                id="description"
                                name="description"
                                placeholder="Project Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Color Picker */}
                        <ColorPicker
                            value={formData.color}
                            onChange={handleColorChange}
                        />

                        <div className="grid gap-3">
                            <Label htmlFor="role">Workspace</Label>
                            <Select
                                value={selectedWorkspace}
                                onValueChange={(value) =>
                                    setSelectedWorkspace(value)
                                }
                            >
                                <SelectTrigger className="w-full border-1 py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                                    <SelectValue placeholder="Select a workspace" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectGroup>
                                        {workspaces?.map(
                                            (workspace: Workspace) => (
                                                <SelectItem
                                                    key={workspace.id}
                                                    value={workspace.id}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {/* <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    "#3B82F6",
                                                            }}
                                                        /> */}
                                                        {workspace.name}
                                                    </div>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        {workspace ? (
                            <CustomButton
                                label={updating ? "Updating..." : "Update"}
                                type="submit"
                                disabled={updating}
                            />
                        ) : (
                            <CustomButton
                                label={isPending ? "Creating..." : "Create"}
                                type="submit"
                                disabled={isPending}
                            />
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
