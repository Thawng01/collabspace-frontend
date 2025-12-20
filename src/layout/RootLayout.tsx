// components/Layout.tsx
import { useState, useEffect } from "react";

import type { Notification } from "../types";

import Header from "../components/Header";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";

const RootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const notifications: Notification[] = [
        {
            id: "1",
            type: "assignment",
            title: "New task assigned",
            message: 'You have been assigned to "Fix login page"',
            read: false,
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            taskId: "task-123",
        },
        {
            id: "2",
            type: "mention",
            title: "You were mentioned",
            message: "Sarah mentioned you in a comment",
            read: true,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            taskId: "task-456",
        },
    ];
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    notifications={notifications}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                />

                <main className="flex-1 overflow-auto">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RootLayout;
