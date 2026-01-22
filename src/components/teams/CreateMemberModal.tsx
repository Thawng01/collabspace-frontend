// components/teams/CreateMemberModal.tsx
import React, { useState } from "react";
import { User, Mail, Shield, Crown, Building2 } from "lucide-react";
import type { TeamMember } from "../../pages/team/TeamPage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import CustomButton from "../shared/CustomButton";

interface CreateMemberModalProps {
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, "id">) => void;
  workspaces: Array<{ id: string; name: string }>;
  open: boolean;
}

type Role = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

const role: Role[] = ["OWNER", "ADMIN", "MEMBER", "VIEWER"];

const CreateMemberModal: React.FC<CreateMemberModalProps> = ({
  onClose,
  onSubmit,
  workspaces,
  open,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "member" as "admin" | "member",
    workspaceId: workspaces[0]?.id || "",
    avatar: "",
  });
  const [selectedRole, setSelectedRole] = useState<Role>(role[2]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.workspaceId) {
      newErrors.workspaceId = "Please select a workspace";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        joinedAt: new Date().toISOString(),
        status: "active",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "member",
        workspaceId: workspaces[0]?.id || "",
        avatar: "",
      });
      setErrors({});
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when closing
      setFormData({
        name: "",
        email: "",
        role: "member",
        workspaceId: workspaces[0]?.id || "",
        avatar: "",
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <User className="w-6 h-6" />
            Create New Member
          </DialogTitle>
          <DialogDescription>
            Add a new member to your team. All fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 py-2">
            {/* Name Input */}
            <div className="space-y-3">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className={`pl-10 w-full ${errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-1 border-gray-300 focus:outline-none focus:ring-0.5 focus:ring-blue-400"}`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className={`pl-10 w-full ${errors.email ? "border-red-500 focus-visible:ring-red-500" : " border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-3">
              <div className="space-y-3 flex-1 ">
                <Label htmlFor="workspace">Workspace *</Label>
                <Select
                  value={formData.workspaceId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, workspaceId: value })
                  }
                >
                  <SelectTrigger
                    id="workspace"
                    className="w-full border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <SelectValue placeholder="Select a workspace" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-0">
                    {workspaces.map((workspace) => (
                      <SelectItem key={workspace.id} value={workspace.id}>
                        <div className="flex items-center gap-2">
                          {workspace.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workspaceId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.workspaceId}
                  </p>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={selectedRole}
                  onValueChange={(value: Role) => setSelectedRole(value)}
                >
                  <SelectTrigger className="w-full border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectGroup>
                      {role.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1 bg-gray-100 border-0"
            >
              Cancel
            </Button>

            <CustomButton type="submit" label="Create Member" style="flex-1" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberModal;
