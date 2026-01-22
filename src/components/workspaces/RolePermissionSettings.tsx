// components/role-permissions/RolePermissionSettings.tsx
"use client";

import React, { useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


// import { useToast } from "@/hooks/use-toast";
// import { RolePermissionService } from "@/services/rolePermissionService";
// import type {
//   Role,
//   Permission,
//   CategoryGroup,
//   RoleFormData,
// } from "@/types/role-permission";
import {
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Shield,
  Users,
  Search,
  Check,
  X,
  Copy,
  Loader2,
  Filter,
  Save,
  RefreshCw,
} from "lucide-react";
// import RoleForm from "./RoleForm";
// import PermissionMatrix from "./PermissionMatrix";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function RolePermissionSettings() {
  const [roles, setRoles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any | null>(null);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
//   const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [rolesData, permissionsData] = await Promise.all([
        // RolePermissionService.getRoles(),
        // RolePermissionService.getPermissions(),
      ]);
      setRoles(rolesData);
      setCategories(permissionsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load role and permission data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleRoleCreated = (newRole: Role) => {
    setRoles([...roles, newRole]);
    setSelectedRole(newRole);
    setShowRoleForm(false);
    toast({
      title: "Success",
      description: `Role "${newRole.name}" created successfully`,
    });
  };

  const handleRoleUpdated = (updatedRole: Role) => {
    setRoles(
      roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
    setSelectedRole(updatedRole);
    setShowRoleForm(false);
    toast({
      title: "Success",
      description: `Role "${updatedRole.name}" updated successfully`,
    });
  };

  const handleDeleteClick = (role: Role) => {
    if (role.isSystem) {
      toast({
        title: "Cannot Delete",
        description: "System roles cannot be deleted",
        variant: "destructive",
      });
      return;
    }
    setRoleToDelete(role);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roleToDelete) return;

    try {
      await RolePermissionService.deleteRole(roleToDelete.id);
      setRoles(roles.filter((role) => role.id !== roleToDelete.id));
      if (selectedRole?.id === roleToDelete.id) {
        setSelectedRole(
          roles.find((role) => role.id !== roleToDelete.id) || null
        );
      }
      toast({
        title: "Success",
        description: `Role "${roleToDelete.name}" deleted successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete role",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setRoleToDelete(null);
    }
  };

  const handleDuplicateRole = async (role: Role) => {
    try {
      const newRole = await RolePermissionService.createRole({
        name: `${role.name} (Copy)`,
        description: role.description || "",
        permissions: role.permissions,
      });
      setRoles([...roles, newRole]);
      setSelectedRole(newRole);
      toast({
        title: "Success",
        description: `Role "${newRole.name}" created successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate role",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={() => {
              setSelectedRole(null);
              setShowRoleForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Role
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPermissionMatrix(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Permission Matrix
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>
              {roles.length} role{roles.length !== 1 ? "s" : ""} defined
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredRoles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                        selectedRole?.id === role.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{role.name}</h3>
                            {role.isSystem && (
                              <Badge variant="secondary" className="text-xs">
                                System
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {role.description || "No description"}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {role.userCount} user
                              {role.userCount !== 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {role.permissions.length} permission
                              {role.permissions.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRole(role);
                                setShowRoleForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateRole(role);
                              }}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(role);
                              }}
                              className="text-destructive"
                              disabled={role.isSystem}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  {filteredRoles.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "No roles found" : "No roles defined"}
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Role Details & Permissions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedRole
                ? `Permissions: ${selectedRole.name}`
                : "Select a Role"}
            </CardTitle>
            <CardDescription>
              {selectedRole
                ? "Manage permissions for this role. Changes are saved automatically."
                : "Select a role from the list to view and edit its permissions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <PermissionMatrix
                role={selectedRole}
                categories={categories}
                onPermissionsUpdate={(updatedPermissions) => {
                  const updatedRole = {
                    ...selectedRole,
                    permissions: updatedPermissions,
                  };
                  setSelectedRole(updatedRole);
                  setRoles(
                    roles.map((r) =>
                      r.id === updatedRole.id ? updatedRole : r
                    )
                  );
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Role Selected</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Select a role from the list to view and manage its
                  permissions, or create a new role to get started.
                </p>
                <Button
                  onClick={() => {
                    setSelectedRole(null);
                    setShowRoleForm(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Role
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Role Form Dialog */}
      <Dialog open={showRoleForm} onOpenChange={setShowRoleForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? "Edit Role" : "Create New Role"}
            </DialogTitle>
            <DialogDescription>
              Define role name, description, and assign permissions.
            </DialogDescription>
          </DialogHeader>
          <RoleForm
            role={selectedRole}
            categories={categories}
            onSuccess={(role) => {
              if (selectedRole) {
                handleRoleUpdated(role);
              } else {
                handleRoleCreated(role);
              }
            }}
            onCancel={() => setShowRoleForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{roleToDelete?.name}"?
              This action cannot be undone. {roleToDelete?.userCount || 0}{" "}
              user(s) will lose their permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRoleToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Permission Matrix Dialog */}
      <Dialog
        open={showPermissionMatrix}
        onOpenChange={setShowPermissionMatrix}
      >
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Permission Matrix</DialogTitle>
            <DialogDescription>
              Compare permissions across all roles at a glance
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id} className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{role.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {role.permissions.length} perms
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <React.Fragment key={category.category}>
                    <TableRow className="bg-muted/50">
                      <TableCell
                        colSpan={roles.length + 1}
                        className="font-semibold"
                      >
                        {category.category}
                      </TableCell>
                    </TableRow>
                    {category.permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{permission.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {permission.code}
                            </div>
                          </div>
                        </TableCell>
                        {roles.map((role) => (
                          <TableCell key={role.id} className="text-center">
                            {role.permissions.includes(permission.code) ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPermissionMatrix(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
