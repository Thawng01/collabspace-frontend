import { useQueryClient } from "@tanstack/react-query";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDelete } from "../../hooks/useDelete";

export function ProjectDelete({
    projectId,
    onOpen,
    params,
}: {
    projectId: string;
    onOpen: any;
    params?: string;
}) {
    const queryClient = useQueryClient();
    const { mutate: deleteItem, isPending } = useDelete(
        `/projects/${projectId}`,
        () => {
            queryClient.invalidateQueries({
                queryKey: ["/projects", { workspace: params }],
            });
            onOpen(false);
        }
    );
    const handleDelete = () => {
        deleteItem({});
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center cursor-pointer w-full py-2 text-sm text-red-600 hover:bg-red-50">
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    Delete Project
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your project and remove all the data under it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleDelete}
                        className="text-white bg-red-600"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
