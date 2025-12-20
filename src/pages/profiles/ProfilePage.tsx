// pages/profile.tsx
import React from "react";
import type { User } from "../../components/profiles/ProfileComponent";
import ProfileComponent from "../../components/profiles/ProfileComponent";

const Profile: React.FC = () => {
    // This would typically come from your API/state management
    const mockUser: User = {
        id: "user_123",
        email: "john.doe@example.com",
        name: "John Doe",
        password: "hashed_password",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2024-01-20"),
        ownedWorkspaces: [
            { id: "ws_1", name: "Marketing Team" },
            { id: "ws_2", name: "Product Development" },
        ],
        workspaceMemberships: [],
        assignedTasks: [
            { id: "task_1", title: "Design Homepage" },
            { id: "task_2", title: "Write Documentation" },
        ],
        comments: [],
        notifications: [
            {
                id: "notif_1",
                title: "New task assigned",
                read: false,
                createdAt: new Date("2024-01-20"),
            },
            {
                id: "notif_2",
                title: "Workspace updated",
                read: true,
                createdAt: new Date("2024-01-19"),
            },
        ],
        Activity: [
            {
                id: "act_1",
                action: "Created new workspace",
                timestamp: new Date("2024-01-20"),
                details: "Marketing Team",
            },
            {
                id: "act_2",
                action: "Completed task",
                timestamp: new Date("2024-01-19"),
                details: "Design Homepage",
            },
        ],
    };

    return <ProfileComponent user={mockUser} />;
};

export default Profile;
