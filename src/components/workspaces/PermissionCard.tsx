import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  BarChart,
  Briefcase,
  Check,
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  File,
  Globe,
  MessageSquare,
  RotateCcw,
  Settings,
  Shield,
  Tag,
  Users,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import type { Role } from "./RolePanel";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdate } from "../../hooks/useUpdate";
import CustomButton from "../shared/CustomButton";
import { useParams } from "react-router";

interface Permission {
  id: string;
  roleId: string;
  permission: string;
  allowed: boolean;
  createdAt: string;
}

interface CategoryGroup {
  category: string;
  permissions: Permission[];
  allPermissions: Permission[];
}

interface Props {
  selectedRole: Role;
}

const PermissionCard: React.FC<Props> = ({ selectedRole }) => {
  const [groupedPermissions, setGroupedPermissions] = useState<any[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    `/workspaces/roles/${selectedRole.id}/permissions`,
  );

  const { mutate } = useUpdate("/workspaces/roles/permissions/update", () => {
    queryClient.invalidateQueries({
      queryKey: [`/workspaces/roles/${selectedRole.id}/permissions`],
    });
  });
  const { mutate: updateMultiPermission } = useUpdate(
    "/workspaces/roles/permissions/multi-permissions",
    () => {
      queryClient.invalidateQueries({
        queryKey: [`/workspaces/roles/${selectedRole.id}/permissions`],
      });
    },
  );
  const { mutate: updatePermissionOnlyRead } = useUpdate(
    `/workspaces/roles/permissions/readonly/${id}`,
    () => {
      queryClient.invalidateQueries({
        queryKey: [`/workspaces/roles/${selectedRole.id}/permissions`],
      });
    },
  );

  useEffect(() => {
    if (!isLoading && data) {
      const groups: CategoryGroup[] = [];
      data.forEach((permission: Permission) => {
        const category = permission.permission.split(":")[0];
        let group = groups.find((g) => g.category === category);
        if (!group) {
          group = {
            category,
            permissions: [],
            allPermissions: data,
          };
          groups.push(group);
        }
        group.permissions.push(permission);
      });

      const groupsSorted = groups.sort((a, b) =>
        a.category.localeCompare(b.category),
      );

      setGroupedPermissions(groupsSorted);
    }
  }, [isLoading, data]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "workspace":
        return <Globe className="h-4 w-4" />;
      case "member":
        return <Users className="h-4 w-4" />;
      case "role":
        return <Shield className="h-4 w-4" />;
      case "project":
        return <Briefcase className="h-4 w-4" />;
      case "task":
        return <Check className="h-4 w-4" />;
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "label":
        return <Tag className="h-4 w-4" />;
      case "file":
        return <File className="h-4 w-4" />;
      case "settings":
        return <Settings className="h-4 w-4" />;
      case "analytics":
        return <BarChart className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handlePermissionToggle = (id: string) => {
    if (!selectedRole || selectedRole.name === "OWNER") {
      return;
    }
    mutate({ id });
  };

  const handleMultiPermissionToggle = (
    permissions: Permission[],
    type: string,
  ) => {
    if (!selectedRole || selectedRole.name === "OWNER") {
      return;
    }
    updateMultiPermission({ permissions, type });
  };

  const totalCount = data?.length;
  const enabledCount = data?.filter((perm: Permission) => perm.allowed).length;

  return (
    <div className="lg:col-span-3 space-y-6">
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
                    {selectedRole?.name} Permissions
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedRole?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
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
                disabled={!hasChanges || saving}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>

              <CustomButton
                label={saving ? "Saving..." : "Save"}
                Icon={Save}
                onClick={handleSave}
                disabled={!hasChanges || saving}
              />
            </div> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-medium text-gray-900">{totalCount}</p>
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
                  {totalCount! - enabledCount!}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleMultiPermissionToggle(data, "enable");
              }}
              disabled={selectedRole?.name === "OWNER"}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Check className="h-4 w-4 mr-2" />
              Enable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleMultiPermissionToggle(data, "disable");
              }}
              disabled={selectedRole?.name === "OWNER"}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Disable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updatePermissionOnlyRead({
                  roleId: selectedRole.id,
                });
              }}
              disabled={selectedRole?.name === "OWNER"}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Only View
            </Button>
          </div>
        </div>
      </div>
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{/* {enabledCount} of {totalCount} enabled */}</span>
            </div>
          </div>

          <div className="space-y-4">
            {groupedPermissions.map((group) => {
              const enabledInCategory = group.permissions.length;
              const allEnabled =
                enabledInCategory ===
                group.permissions.filter((perm: Permission) => perm.allowed)
                  .length;
              const isExpanded = expandedCategories[group.category];

              return (
                <div
                  key={group.category}
                  className="border border-gray-200 rounded-lg"
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCategory(group.category)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-gray-100">
                        {getCategoryIcon(group.category)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {group.category}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {enabledInCategory} of{" "}
                          {
                            group.permissions.filter(
                              (perm: Permission) => perm.allowed,
                            ).length
                          }{" "}
                          enabled
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMultiPermissionToggle(
                            group.permissions,
                            allEnabled ? "disable" : "enable",
                          );
                        }}
                        disabled={selectedRole.name === "OWNER"}
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

                  {isExpanded && (
                    <>
                      <Separator className="bg-gray-200" />
                      <div className="p-4 space-y-3">
                        {group.permissions.map((permission: Permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900 text-sm capitalize">
                                  {permission.permission.split(":")[1]}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200 inline-block">
                                {permission.permission}
                              </div>
                            </div>

                            <Switch
                              checked={permission.allowed}
                              onCheckedChange={() =>
                                handlePermissionToggle(permission.id)
                              }
                              disabled={selectedRole.name === "OWNER"}
                              className="
    bg-gray-200
    data-[state=checked]:bg-gray-200
    [&_span]:bg-white
    [&_span[data-state=checked]]:bg-green-500
  "
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
  );
};

export default PermissionCard;
