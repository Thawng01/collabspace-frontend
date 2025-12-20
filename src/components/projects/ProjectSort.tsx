import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function ProjectSort({
    sort,
    onSort,
}: {
    sort: "name" | "updatedAt" | "createdAt";
    onSort: React.Dispatch<
        React.SetStateAction<"name" | "updatedAt" | "createdAt">
    >;
}) {
    return (
        <Select
            value={sort}
            defaultValue="name"
            onValueChange={(e) => onSort(e)}
        >
            <SelectTrigger className="w-[130px] border-1 border-[gray] focus:outline-none">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-0">
                <SelectGroup>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="updated">UpdatedAt</SelectItem>
                    <SelectItem value="created">CreatedAt</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
