import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Copy, MoreVertical, Plus, Shield, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface Role {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  updatedAt: Date;
}

export interface RolePanelProps {
  roles: Role[];
  selectedRole: Role | null;
  onSelected: (role: Role) => void;
}

const RolePanel: React.FC<RolePanelProps> = ({
  roles,
  selectedRole,
  onSelected,
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-gray-900">Roles</h2>
            <Button
              variant="ghost"
              size="sm"
              //   onClick={handleAddRole}
              //   disabled={fetching || !workspaceId}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-2">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                  selectedRole?.id === role.id
                    ? "bg-blue-50 border border-blue-100"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
                onClick={() => onSelected(role)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`p-1.5 rounded ${
                          selectedRole?.id === role.id
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Shield
                          className={`h-3.5 w-3.5 ${
                            selectedRole?.id === role.id
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {role.name !== "OWNER" && (
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
                        //   onClick={() => handleDuplicateRole(role)}
                        >
                          <Copy className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-gray-700">Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          //   onClick={() => {
                          //     setRoleToDelete(role);
                          //     setShowDeleteDialog(true);
                          //   }}
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
  );
};

export default RolePanel;
