import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import type { Workspace } from "../../types";
import { Button } from "../ui/button";
import { usePost } from "../../hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const MemberList = ({ workspace }: { workspace: Workspace }) => {
    const [open, setOpen] = useState(false);
    const formatMemberCount = (count: number) => {
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };

    const queryClient = useQueryClient();
    const { data: user } = useFetch("/users/me");

    const { mutate: deleteItem, error } = usePost(
        "/workspaces/members/remove",
        () => {
            queryClient.invalidateQueries({ queryKey: ["/workspaces"] });
            setOpen(false);
        }
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center cursor-pointer">
                    <div className="flex -space-x-2">
                        {workspace.members.length > 0 &&
                            workspace.members.slice(0, 4).map((member) => (
                                <div
                                    key={member.id}
                                    className="relative group/member"
                                >
                                    <div
                                        className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-sm"
                                        title={`${member.user?.name} (${member.role})`}
                                    >
                                        {member.user?.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover/member:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
                                        {member.user?.name} • {member.role}
                                    </div>
                                </div>
                            ))}
                        {workspace.members.length > 4 && (
                            <button
                                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium transition-colors"
                                title={`View all ${workspace.members.length} members`}
                            >
                                +{workspace.members.length - 4}
                            </button>
                        )}
                    </div>
                    <span className="text-sm text-gray-500 ml-3">
                        {formatMemberCount(workspace.members.length)} members
                    </span>
                </div>
            </DialogTrigger>

            <DialogContent className="bg-white border-0">
                <DialogHeader>
                    <DialogTitle>Members List</DialogTitle>
                </DialogHeader>

                {error && (
                    <span className="text-red-600">
                        {error?.response?.data}
                    </span>
                )}
                <div>
                    {workspace?.members.map((member) => {
                        return (
                            <div className="my-1 p-2 flex justify-between">
                                <div className="flex items-center">
                                    {member.user?.avatar ? (
                                        <p>Helo</p>
                                    ) : (
                                        <div className="w-10 h-10 items-center justify-center flex rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                                            <p className="text-lg font-bold text-white">
                                                {member.user.name.charAt(0)}
                                            </p>
                                        </div>
                                    )}
                                    <div className="pl-3">
                                        <p className="font-medium">
                                            {member.user?.name}
                                        </p>
                                        <p
                                            className={`text-sm font-medium ${
                                                member.role === "OWNER"
                                                    ? "text-green-700"
                                                    : member.role === "ADMIN"
                                                    ? "text-blue-400"
                                                    : member.role === "MEMBER"
                                                    ? "text-yellow-500"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                {user?.id !== member.user.id && (
                                    <Button
                                        onClick={() =>
                                            deleteItem({ id: member.id })
                                        }
                                        size="sm"
                                        className="bg-red-600 text-white font-medium cursor-pointer"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MemberList;
