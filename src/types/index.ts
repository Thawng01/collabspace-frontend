



export interface AuthFormData {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    confirmPassword?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: User;
}

// types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt?: Date
    updatedAt?: Date
}

export interface Notification {
    id: string;
    type: 'assignment' | 'mention' | 'due_date' | 'update';
    title: string;
    message: string;
    read: boolean;
    timestamp: Date;
    taskId?: string;
}



export interface WorkspaceMember {
    id: string;
    user: User;
    role: string;
}

export interface Workspace {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    members: WorkspaceMember[] | []
    labels: Label[] | []
    owner: {
        id: string
        name: string
        email: string
        avatar: string
    }
    _count: {
        projects: number,
        members: number,
    }

}

export interface WorkspaceStats {
    totalProjects: number;
    totalMembers: number;
}

export interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    badge?: number;
    children?: NavItem[];
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    workspace: Workspace;
    columns: Column[];
    wipLimit: number | undefined
    activities: Activity[];
}

// types/column.ts
export interface Column {
    id: string;
    title: string;
    order: number; // Position from left to right
    projectId: string;
    color?: string; // Optional color coding
    wipLimit?: number; // Work-in-progress limit
    createdAt: Date;
    updatedAt: Date;
}

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus
    priority: Priority
    dueDate?: Date;
    assigneeId: string
    assignee?: {
        id: string;
        name: string;
        email: string
        avatar?: string;
    };
    labels?: {
        id: string;
        name: string;
        color: string;
    }[];
    comments: Comment[]
    attachments: any[]
    activities: any[]
    commentsCount?: number;
    attachmentsCount?: number;
    order: number;
    columnId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    authorId: string
    author: User
    task?: Task
    isOptimistic?: boolean
}

export interface Label {
    id: string
    color: string
    name: string
    createdAt: Date
}

export interface TaskLabel extends Label {
    label: Label
}

export interface Attactment {
    id: string
    filename: string
    url: string
    fileSize: number
    fileType: string
    createdAt: Date
}

export interface Activity {
    id: string
    action: string,
    details: string
    createdAt: Date
    user: User
    project: Project
    task: Task
}

export interface UpdateColumnData {
    title?: string;
    order?: number;
    color?: string;
    wipLimit?: number;
}

export interface Activity {
    id: string;
    title: string;
    description?: string;
    type: string;
    createdAt: Date;
    projectId: string;
}