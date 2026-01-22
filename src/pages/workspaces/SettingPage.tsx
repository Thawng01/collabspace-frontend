// app/(dashboard)/settings/roles-permissions/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Users,
  Search,
  Check,
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  ChevronDown,
  ChevronUp,
  Settings,
  User,
  Folder,
  File,
  MessageSquare,
  Bell,
  Key,
  Globe,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

interface Permission {
  id: string;
  code: string;
  name: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  userCount: number;
  permissions: string[];
}

interface CategoryGroup {
  category: string;
  permissions: Permission[];
}

const PERMISSIONS_DATA: Permission[] = [
  {
    id: "1",
    code: "user:view",
    name: "View Users",
    category: "User Management",
  },
  {
    id: "2",
    code: "user:create",
    name: "Create Users",
    category: "User Management",
  },
  {
    id: "3",
    code: "user:edit",
    name: "Edit Users",
    category: "User Management",
  },
  {
    id: "4",
    code: "user:delete",
    name: "Delete Users",
    category: "User Management",
  },
  {
    id: "5",
    code: "user:assign_role",
    name: "Assign Roles",
    category: "User Management",
  },

  {
    id: "6",
    code: "settings:view",
    name: "View Settings",
    category: "Settings",
  },
  {
    id: "7",
    code: "settings:edit",
    name: "Edit Settings",
    category: "Settings",
  },
  {
    id: "8",
    code: "settings:system",
    name: "System Settings",
    category: "Settings",
  },

  {
    id: "9",
    code: "project:view",
    name: "View Projects",
    category: "Projects",
  },
  {
    id: "10",
    code: "project:create",
    name: "Create Projects",
    category: "Projects",
  },
  {
    id: "11",
    code: "project:edit",
    name: "Edit Projects",
    category: "Projects",
  },
  {
    id: "12",
    code: "project:delete",
    name: "Delete Projects",
    category: "Projects",
  },
  {
    id: "13",
    code: "project:manage_members",
    name: "Manage Members",
    category: "Projects",
  },

  {
    id: "22",
    code: "notification:view",
    name: "View Notifications",
    category: "Notifications",
  },
  {
    id: "23",
    code: "notification:create",
    name: "Create Notifications",
    category: "Notifications",
  },
  {
    id: "24",
    code: "notification:edit",
    name: "Edit Notifications",
    category: "Notifications",
  },
  {
    id: "25",
    code: "notification:delete",
    name: "Delete Notifications",
    category: "Notifications",
  },
];

const ROLES_DATA: Role[] = [
  {
    id: "1",
    name: "Administrator",
    description: "Full system access",
    isSystem: true,
    userCount: 3,
    permissions: PERMISSIONS_DATA.map((p) => p.code),
  },
  {
    id: "2",
    name: "Manager",
    description: "Manage teams and projects",
    isSystem: true,
    userCount: 5,
    permissions: PERMISSIONS_DATA.filter(
      (p) =>
        !p.code.includes("system:") &&
        !p.code.includes("settings:system") &&
        !p.code.includes(":delete") &&
        !p.code.includes("user:delete") &&
        !p.code.includes("user:assign_role")
    ).map((p) => p.code),
  },
  {
    id: "3",
    name: "Contributor",
    description: "Create and edit content",
    isSystem: true,
    userCount: 12,
    permissions: PERMISSIONS_DATA.filter(
      (p) =>
        p.code.includes(":view") ||
        p.code.includes(":create") ||
        p.code.includes(":edit") ||
        p.code.includes("project:") ||
        p.code.includes("document:") ||
        p.code.includes("message:")
    )
      .map((p) => p.code)
      .filter(
        (p) =>
          !p.includes(":delete") &&
          !p.includes("settings:") &&
          !p.includes("user:") &&
          !p.includes("system:") &&
          !p.includes("notification:create") &&
          !p.includes("notification:edit") &&
          !p.includes("notification:delete")
      ),
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access",
    isSystem: true,
    userCount: 45,
    permissions: PERMISSIONS_DATA.filter(
      (p) =>
        p.code.includes(":view") &&
        !p.code.includes("settings:") &&
        !p.code.includes("user:") &&
        !p.code.includes("system:")
    ).map((p) => p.code),
  },
];

export default function RolePermissionPage() {
  const [roles, setRoles] = useState<Role[]>(ROLES_DATA);
  const [permissions] = useState<Permission[]>(PERMISSIONS_DATA);
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES_DATA[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [permissionStates, setPermissionStates] = useState<
    Record<string, boolean>
  >({});
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const groupedPermissions: CategoryGroup[] = React.useMemo(() => {
    const groups: CategoryGroup[] = [];
    permissions.forEach((permission) => {
      const category = permission.category;
      let group = groups.find((g) => g.category === category);
      if (!group) {
        group = { category, permissions: [] };
        groups.push(group);
      }
      group.permissions.push(permission);
    });
    return groups;
  }, [permissions]);

  useEffect(() => {
    const states: Record<string, boolean> = {};
    permissions.forEach((permission) => {
      states[permission.code] = selectedRole.permissions.includes(
        permission.code
      );
    });
    setPermissionStates(states);
    setHasChanges(false);
  }, [selectedRole, permissions]);

  useEffect(() => {
    const expanded: Record<string, boolean> = {};
    groupedPermissions.forEach((group) => {
      expanded[group.category] = true;
    });
    setExpandedCategories(expanded);
  }, [groupedPermissions]);

  const handlePermissionToggle = (permissionCode: string) => {
    if (selectedRole.isSystem && selectedRole.name === "Administrator") {
      return;
    }

    setPermissionStates((prev) => ({
      ...prev,
      [permissionCode]: !prev[permissionCode],
    }));
    setHasChanges(true);
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedRole.isSystem && selectedRole.name === "Administrator") {
      return;
    }

    const categoryPermissions =
      groupedPermissions
        .find((g) => g.category === category)
        ?.permissions.map((p) => p.code) || [];

    const allEnabled = categoryPermissions.every(
      (code) => permissionStates[code]
    );
    const newStates = { ...permissionStates };

    categoryPermissions.forEach((code) => {
      newStates[code] = !allEnabled;
    });

    setPermissionStates(newStates);
    setHasChanges(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedPermissions = Object.entries(permissionStates)
        .filter(([, enabled]) => enabled)
        .map(([code]) => code);

      const updatedRole = {
        ...selectedRole,
        permissions: updatedPermissions,
      };

      setRoles((prev) =>
        prev.map((role) => (role.id === selectedRole.id ? updatedRole : role))
      );
      setSelectedRole(updatedRole);
      setHasChanges(false);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    const states: Record<string, boolean> = {};
    permissions.forEach((permission) => {
      states[permission.code] = selectedRole.permissions.includes(
        permission.code
      );
    });
    setPermissionStates(states);
    setHasChanges(false);
  };

  const handleAddRole = () => {
    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: "Custom Role",
      description: "Custom access permissions",
      isSystem: false,
      userCount: 0,
      permissions: ["project:view", "document:view"],
    };

    setRoles((prev) => [...prev, newRole]);
    setSelectedRole(newRole);
  };

  const handleDuplicateRole = (role: Role) => {
    const newRole: Role = {
      ...role,
      id: `role-${Date.now()}`,
      name: `${role.name} Copy`,
      isSystem: false,
      userCount: 0,
    };

    setRoles((prev) => [...prev, newRole]);
    setSelectedRole(newRole);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enabledCount = Object.values(permissionStates).filter(Boolean).length;
  const totalCount = permissions.length;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "User Management":
        return <User className="h-4 w-4" />;
      case "Settings":
        return <Settings className="h-4 w-4" />;
      case "Projects":
        return <Folder className="h-4 w-4" />;
      case "Documents":
        return <File className="h-4 w-4" />;
      case "Communication":
        return <MessageSquare className="h-4 w-4" />;
      case "Notifications":
        return <Bell className="h-4 w-4" />;
      case "System":
        return <Globe className="h-4 w-4" />;
      case "Authentication":
        return <Key className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">
            Role Permissions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage user roles and configure access permissions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Role List Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-medium text-gray-900">Roles</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAddRole}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 bg-gray-50 border-gray-300"
                  />
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-2">
                  {filteredRoles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                        selectedRole.id === role.id
                          ? "bg-blue-50 border border-blue-100"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                      onClick={() => setSelectedRole(role)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={`p-1.5 rounded ${
                                selectedRole.id === role.id
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <Shield
                                className={`h-3.5 w-3.5 ${
                                  selectedRole.id === role.id
                                    ? "text-blue-600"
                                    : "text-gray-600"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-gray-900">
                                  {role.name}
                                </span>
                                {role.isSystem && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-gray-100 text-gray-600 border-gray-300"
                                  >
                                    System
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">
                                {role.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                            <span>{role.userCount} users</span>
                            <span>•</span>
                            <span>{role.permissions.length} permissions</span>
                          </div>
                        </div>
                        {!role.isSystem && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-gray-100"
                              >
                                <MoreVertical className="h-4 w-4 text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                onClick={() => handleDuplicateRole(role)}
                              >
                                <Copy className="h-4 w-4 mr-2 text-gray-600" />
                                <span className="text-gray-700">Duplicate</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setRoleToDelete(role);
                                  setShowDeleteDialog(true);
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Role Header */}
            <div className="bg-white border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-medium text-gray-900">
                          {selectedRole.name} Permissions
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedRole.description}
                          {selectedRole.isSystem && " • System role"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasChanges && (
                      <div className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-amber-700 text-xs flex items-center">
                        <span className="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                        Unsaved changes
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={!hasChanges || loading}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={!hasChanges || loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-medium text-gray-900">
                      {totalCount}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Enabled</p>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-2xl font-medium text-gray-900">
                        {enabledCount}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Disabled</p>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" />
                      </div>
                      <p className="text-2xl font-medium text-gray-900">
                        {totalCount - enabledCount}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Coverage</p>
                    <p className="text-2xl font-medium text-gray-900">
                      {Math.round((enabledCount / totalCount) * 100)}%
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newStates = { ...permissionStates };
                      Object.keys(newStates).forEach((key) => {
                        newStates[key] = true;
                      });
                      setPermissionStates(newStates);
                      setHasChanges(true);
                    }}
                    disabled={
                      selectedRole.isSystem &&
                      selectedRole.name === "Administrator"
                    }
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Enable All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newStates = { ...permissionStates };
                      Object.keys(newStates).forEach((key) => {
                        newStates[key] = false;
                      });
                      setPermissionStates(newStates);
                      setHasChanges(true);
                    }}
                    disabled={
                      selectedRole.isSystem &&
                      selectedRole.name === "Administrator"
                    }
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Disable All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newStates = { ...permissionStates };
                      Object.keys(newStates).forEach((key) => {
                        newStates[key] = key.includes(":view");
                      });
                      setPermissionStates(newStates);
                      setHasChanges(true);
                    }}
                    disabled={
                      selectedRole.isSystem &&
                      selectedRole.name === "Administrator"
                    }
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Only
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newStates = { ...permissionStates };
                      Object.keys(newStates).forEach((key) => {
                        newStates[key] =
                          key.includes(":create") || key.includes(":edit");
                      });
                      setPermissionStates(newStates);
                      setHasChanges(true);
                    }}
                    disabled={
                      selectedRole.isSystem &&
                      selectedRole.name === "Administrator"
                    }
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Only
                  </Button>
                </div>
              </div>
            </div>

            {/* Permissions List */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Permissions
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>
                      {enabledCount} of {totalCount} enabled
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {groupedPermissions.map((group) => {
                    const enabledInCategory = group.permissions.filter(
                      (p) => permissionStates[p.code]
                    ).length;
                    const allEnabled =
                      enabledInCategory === group.permissions.length;
                    const isExpanded = expandedCategories[group.category];

                    return (
                      <div
                        key={group.category}
                        className="border border-gray-200 rounded-lg"
                      >
                        {/* Category Header */}
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleCategory(group.category)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-gray-100">
                              {getCategoryIcon(group.category)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {group.category}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {enabledInCategory} of{" "}
                                {group.permissions.length} enabled
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryToggle(group.category);
                              }}
                              disabled={
                                selectedRole.isSystem &&
                                selectedRole.name === "Administrator"
                              }
                              className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              {allEnabled ? "Disable All" : "Enable All"}
                            </Button>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </div>

                        {/* Permissions List */}
                        {isExpanded && (
                          <>
                            <Separator className="bg-gray-200" />
                            <div className="p-4 space-y-3">
                              {group.permissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                                >
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-900 text-sm">
                                        {permission.name}
                                      </span>
                                      <span
                                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                          permissionStates[permission.code]
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-gray-50 text-gray-600 border border-gray-200"
                                        }`}
                                      >
                                        {permissionStates[permission.code] ? (
                                          <>
                                            <Check className="h-3 w-3" />
                                            Enabled
                                          </>
                                        ) : (
                                          <>
                                            <X className="h-3 w-3" />
                                            Disabled
                                          </>
                                        )}
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200 inline-block">
                                      {permission.code}
                                    </div>
                                  </div>
                                  <Switch
                                    checked={permissionStates[permission.code]}
                                    onCheckedChange={() =>
                                      handlePermissionToggle(permission.code)
                                    }
                                    disabled={
                                      selectedRole.isSystem &&
                                      selectedRole.name === "Administrator"
                                    }
                                    className="data-[state=checked]:bg-blue-600"
                                  />
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              Delete Role
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete "{roleToDelete?.name}"? This
              action cannot be undone.
              {roleToDelete?.userCount || 0} user(s) assigned to this role will
              need to be reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!roleToDelete) return;
                setRoles((prev) =>
                  prev.filter((role) => role.id !== roleToDelete.id)
                );
                if (selectedRole.id === roleToDelete.id) {
                  setSelectedRole(
                    roles.find((r) => r.id !== roleToDelete.id) || roles[0]
                  );
                }
                setShowDeleteDialog(false);
                setRoleToDelete(null);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
