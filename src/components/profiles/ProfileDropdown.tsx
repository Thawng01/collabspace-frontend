import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { ProfileSkeleton } from "../skeletons/ProfileSkeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";

export function ProfileDropdown() {
    const { logout } = useAuth();
    const { data: user, isLoading } = useFetch("/users/me");
    const navigate = useNavigate();

    if (isLoading) return <ProfileSkeleton />;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-0 focus:outline-0">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group">
                    <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                user?.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 hidden lg:block" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 bg-white border-0"
                align="start"
            >
                <div className="px-4 py-2 border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        {user?.email}
                    </p>
                </div>

                <DropdownMenuItem>
                    <Link
                        to={`/profile/${user?.id}`}
                        className="flex items-center space-x-3 w-full py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        to={`/profile/${user?.id}/setting`}
                        className="flex items-center space-x-3 w-full py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
