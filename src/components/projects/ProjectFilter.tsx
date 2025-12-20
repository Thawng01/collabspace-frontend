import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import type { Workspace } from "../../types";

const ProjectFilter = ({
    workspaces,
    value,
    onChange,
}: {
    workspaces: Workspace[];
    value: string;
    onChange: (e: string) => void;
}) => {
    return (
        <Select
            value={value}
            onValueChange={(e) => onChange(e)}
            defaultValue="all"
        >
            <SelectTrigger className="w-[130px] border-1 border-[gray] focus:outline-none">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-0">
                <SelectGroup>
                    <SelectItem value="all">All Workspaces</SelectItem>
                    {workspaces.map((workspace: Workspace) => {
                        return (
                            <SelectItem value={workspace.id}>
                                {workspace.name}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ProjectFilter;
