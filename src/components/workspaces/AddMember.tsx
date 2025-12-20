import { useState, type ChangeEvent } from "react";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import useFetch from "../../hooks/useFetch";
import type { User } from "../../types";
import SearchableDropdown from "./SearchableDropdown";
import { usePost } from "../../hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";

type Role = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

const role: Role[] = ["OWNER", "ADMIN", "MEMBER", "VIEWER"];

export function AddMember({ workspaceId }: { workspaceId: string }) {
    const [selectedRole, setSelectedRole] = useState<Role>(role[2]);
    const [selectedMember, setSelectedMember] = useState<User | null>(null);
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();
    const { data: users, isLoading } = useFetch("/users/all");
    const {
        mutate: addMember,
        isPending: adding,
        error: addError,
    } = usePost("/workspaces/members", () => {
        queryClient.invalidateQueries({ queryKey: ["/workspaces"] });
        setOpen(false);
    });

    // Transform users to dropdown options
    const userOptions =
        users?.map((user: User) => ({
            value: user.id,
            label: user.name,
            disabled: false,
        })) || [];

    const handleMemberSelect = (userId: string) => {
        const selectedUser = users?.find((user: User) => user.id === userId);
        setSelectedMember(selectedUser || null);
    };

    const handleSubmit = () => {
        addMember({
            workspaceId,
            memberId: selectedMember?.id,
            role: selectedRole,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
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
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                        </svg>
                        Add Member
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white border-none">
                    <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                        <DialogDescription>
                            Search for a user and assign them a role in your
                            workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {addError && (
                            <span className="text-red-600">
                                {addError?.response.data}
                            </span>
                        )}
                        <div className="grid gap-3">
                            <Label htmlFor="member-search">Select Member</Label>
                            <SearchableDropdown
                                options={userOptions}
                                value={selectedMember?.id || ""}
                                onValueChange={handleMemberSelect}
                                placeholder="Search for a user..."
                                searchPlaceholder="Type to search users..."
                                emptyMessage={
                                    isLoading
                                        ? "Loading users..."
                                        : "No users found."
                                }
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={selectedRole}
                                onValueChange={(value: Role) =>
                                    setSelectedRole(value)
                                }
                            >
                                <SelectTrigger className="w-full border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectGroup>
                                        {role.map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <CustomButton
                            label={adding ? "Adding..." : "Add Member"}
                            type="submit"
                            disabled={!selectedMember || adding}
                            onClick={handleSubmit}
                        />
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
