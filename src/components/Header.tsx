// components/Header.tsx
import React, { useState } from "react";
import { Bell, Search, Menu, X, ChevronDown } from "lucide-react";
import type { Notification } from "../types";

import { ProfileDropdown } from "./profiles/ProfileDropdown";

interface HeaderProps {
    notifications: Notification[];
    onToggleSidebar: () => void;
    sidebarOpen: boolean;
    currentWorkspace?: string;
}

const Header: React.FC<HeaderProps> = ({
    notifications,
    onToggleSidebar,
    sidebarOpen,
    currentWorkspace,
}) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const unreadNotifications = notifications.filter((n) => !n.read).length;

    return (
        <header className="bg-white/30 border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5 text-gray-600" />
                        ) : (
                            <Menu className="h-5 w-5 text-gray-600" />
                        )}
                    </button>

                    {/* Workspace Selector */}
                    {currentWorkspace && (
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">
                                {currentWorkspace}
                            </span>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tasks, projects, or team members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/80 backdrop-blur-sm transition-all duration-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <kbd className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-500">
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-3">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                            <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                            {unreadNotifications > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                    {unreadNotifications}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Notifications
                                    </h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="px-4 py-8 text-center text-gray-500">
                                            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                            <p className="text-sm">
                                                No notifications
                                            </p>
                                        </div>
                                    ) : (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-2 ${
                                                    notification.read
                                                        ? "border-transparent"
                                                        : "border-blue-500"
                                                }`}
                                            >
                                                <p className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    {notification.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="px-4 py-2 border-t border-gray-100">
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center py-2">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <ProfileDropdown />
                </div>
            </div>

            {/* Overlay for dropdowns */}
            {(showUserMenu || showNotifications) && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => {
                        setShowUserMenu(false);
                        setShowNotifications(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;
