import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function SortSelect({
    sort,
    onSort,
}: {
    sort: "name" | "updated" | "members";
    onSort: React.Dispatch<
        React.SetStateAction<"name" | "updated" | "members">
    >;
}) {
    return (
        <Select value={sort} onValueChange={(e) => onSort(e as any)}>
            <SelectTrigger className="w-[130px] border-1 border-[gray] focus:outline-none">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-0">
                <SelectGroup>
                    <SelectItem value="updated">Last Update</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="members">Members</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
