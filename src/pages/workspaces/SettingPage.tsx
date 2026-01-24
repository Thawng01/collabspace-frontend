// app/(dashboard)/settings/roles-permissions/page.tsx

import { useState, useEffect } from "react";
import { Shield, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
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
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";
import { toast } from "sonner";
import RolePanel, { type Role } from "../../components/workspaces/RolePanel";
import PermissionCard from "../../components/workspaces/PermissionCard";

interface Permission {
  id: string;
  roleId: string;
  permission: string;
  allowed: boolean;
  createdAt?: string;
  category: string;
  name: string;
}

interface UIRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  permissionsByCategory?: {
    category: string;
    permissions: Permission[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export default function RolePermissionPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<UIRole | null>(null);

  const { id: workspaceId, name } = useParams();

  const { data: roleData, isLoading } = useFetch(
    `/workspaces/${workspaceId}/roles`,
  );

  useEffect(() => {
    if (roleData && roleData.length > 0) {
      const initialSelectedRole = roleData.filter(
        (role: Role) => role.name === "OWNER",
      );
      setSelectedRole(initialSelectedRole[0]);
    }
  }, [roleData]);

  const handleAddRole = async () => {};

  const handleDeleteRole = async (roleId: string) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete role");
      }
      toast.success("Role deleted successfully");
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading roles and permissions...</p>
        </div>
      </div>
    );
  }

  // Error state
  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //           <Shield className="h-6 w-6 text-red-600" />
  //         </div>
  //         <h3 className="text-lg font-medium text-gray-900 mb-2">
  //           Failed to load roles
  //         </h3>
  //         <p className="text-gray-600 mb-4">{error.message}</p>
  //         <Button onClick={() => refetch()} variant="outline">
  //           Try Again
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // No roles state
  if (roleData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No roles available
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first role to get started
            </p>
            <Button onClick={handleAddRole}>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // if (!selectedRole) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-medium text-gray-900">
              Role Permissions
            </h1>
            <span className="text-gray-500 ml-2">({name})</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage user roles and configure access permissions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Role List Panel */}
          <RolePanel
            roles={roleData}
            selectedRole={selectedRole}
            onSelected={setSelectedRole}
          />

          {/* Main Content Area */}

          {selectedRole && <PermissionCard selectedRole={selectedRole} />}
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
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!roleToDelete) return;
                handleDeleteRole(roleToDelete.id);
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
