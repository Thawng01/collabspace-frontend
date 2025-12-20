import { useState } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import type { Column } from "../../types";
import { useUpdate } from "../../hooks/useUpdate";
import { Plus } from "lucide-react";
import { useParams } from "react-router";

export function NewColumn({
    projectId,
    column,
}: {
    projectId: string;
    column?: Column;
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(column?.title || "");
    const { id } = useParams();

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = usePost("/projects/columns", () => {
        queryClient.invalidateQueries({
            queryKey: [`/projects/columns/${id}`],
        });
        setOpen(false);
    });
    const { mutate: updateItem, isPending: updating } = useUpdate(
        `/projects/columns/${projectId}`,
        () => {
            queryClient.invalidateQueries({
                queryKey: [`/projects/columns/${id}`],
            });
            setOpen(false);
        }
    );

    const handleSubmit = () => {
        mutate({
            title: name,

            projectId,
        });
    };
    const handleUpdate = () => {
        updateItem({
            title: name,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    {column ? (
                        <button
                            // onClick={() => {
                            //     onEdit(workspace);
                            //     setIsMenuOpen(false);
                            // }}
                            className="flex items-center w-full py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            {" "}
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
                            Edit Column
                        </button>
                    ) : (
                        <CustomButton label="New Column" Icon={Plus} />
                    )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white border-0">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-2xl">
                            {column ? "Update" : "Create"} Your New Column
                        </DialogTitle>
                        <DialogDescription className="text-[gray]">
                            {column ? "Update" : "Create"} your column to show
                            the stages of the tasks.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {error && (
                            <span className="text-red-600">
                                {error?.response.data}
                            </span>
                        )}
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <input
                                className="focus:outline-0 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3"
                                id="name-1"
                                name="name"
                                placeholder="Column Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {column ? (
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
