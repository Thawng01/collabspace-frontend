import { useState } from "react";
import type { Workspace } from "../../types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CreateWorkspaceModal } from "./CreateWorkspaceModal";
import { DeleteDialog } from "./DeleteDialog";
import { AddMember } from "./AddMember";

export function Action({ workspace }: { workspace: Workspace }) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </PopoverTrigger>
            <PopoverContent className="bg-white border-0 w-auto">
                <CreateWorkspaceModal workspace={workspace} />
                <AddMember workspaceId={workspace.id} />
                <DeleteDialog workspaceId={workspace.id} onOpen={setOpen} />
            </PopoverContent>
        </Popover>
    );
}
