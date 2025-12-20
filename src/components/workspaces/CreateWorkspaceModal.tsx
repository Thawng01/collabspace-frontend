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
import type { Workspace } from "../../types";
import { useUpdate } from "../../hooks/useUpdate";
import { Plus } from "lucide-react";

export function CreateWorkspaceModal({ workspace }: { workspace?: Workspace }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: workspace?.name || "",
        description: workspace?.description || "",
    });

    const queryClient = useQueryClient();
    const { data: user } = useFetch("/users/me");
    const { mutate, isPending } = usePost("/workspaces", () => {
        queryClient.invalidateQueries({ queryKey: ["/workspaces"] });
        setOpen(false);
    });
    const { mutate: updateItem, isPending: updating } = useUpdate(
        `/workspaces/${workspace?.id}`,
        () => {
            queryClient.invalidateQueries({ queryKey: ["/workspaces"] });
            setOpen(false);
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        mutate({
            name: formData.name,
            description: formData.description,
            ownerId: user.id,
        });
    };
    const handleUpdate = () => {
        updateItem({
            name: formData.name,
            description: formData.description,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    {workspace ? (
                        <button
                            // onClick={() => {
                            //     onEdit(workspace);
                            //     setIsMenuOpen(false);
                            // }}
                            className="flex items-center w-full py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
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
                        <CustomButton label="New Workspace" Icon={Plus} />
                    )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white border-0">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-2xl">
                            {workspace ? "Update" : "Create"} Your New Workspace
                        </DialogTitle>
                        <DialogDescription className="text-[gray]">
                            {workspace ? "Update" : "Create"}your space and
                            start your journey
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <input
                                className="focus:outline-0 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3"
                                id="name-1"
                                name="name"
                                placeholder="Workspace Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">
                                Description{" "}
                                <span className="text-[gray]">(Option)</span>
                            </Label>
                            <input
                                className="focus:outline-0 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3"
                                id="description"
                                name="description"
                                placeholder="Workspace Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {workspace ? (
                            <CustomButton
                                label={updating ? "Updating..." : "Update"}
                                type="submit"
                                disabled={updating}
                                onClick={() => handleUpdate()}
                            />
                        ) : (
                            <CustomButton
                                label={isPending ? "Creating..." : "Create"}
                                type="submit"
                                disabled={isPending}
                                onClick={() => handleSubmit()}
                            />
                        )}
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
