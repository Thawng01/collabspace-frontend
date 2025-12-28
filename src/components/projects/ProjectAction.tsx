import { useState } from "react";
import type { Project } from "../../types";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CreateProjectModal } from "./CreateProjectModal";
import { MoreVertical } from "lucide-react";
import { ProjectDelete } from "./ProjectDelete";

export function ProjectAction({
    project,
    selectedWorkspace,
}: {
    project: Project;
    selectedWorkspace?: string;
}) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={20} className="text-gray-400" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="bg-white border-0 w-auto">
                <CreateProjectModal
                    project={project}
                    params={selectedWorkspace}
                />
                <ProjectDelete
                    projectId={project.id}
                    onOpen={setOpen}
                    params={selectedWorkspace}
                />
            </PopoverContent>
        </Popover>
    );
}
