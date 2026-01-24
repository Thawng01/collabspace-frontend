// components/TeamPage.tsx
import React, { useState } from "react";
import {
  Search,
  UserPlus,
  MoreVertical,
  Crown,
  User,
  Mail,
  Calendar,
  Shield,
  Building2,
  Users,
  Filter,
} from "lucide-react";
import CreateMemberModal from "../../components/teams/CreateMemberModal";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import CustomButton from "../../components/shared/CustomButton";
import useFetch from "../../hooks/useFetch";

// types/team.ts
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  avatar?: string;
  joinedAt: string;
  status: "active" | "invited";
  workspaceId: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
}

interface TeamPageProps {
  workspace: Workspace;
}

// Sample workspaces data
const sampleWorkspaces = [
  { id: "ws1", name: "Development Team" },
  { id: "ws2", name: "Marketing Team" },
  { id: "ws3", name: "Design Team" },
  { id: "ws4", name: "Operations" },
];

const TeamPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "member">(
    "all",
  );
  const [filterWorkspace, setFilterWorkspace] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data } = useFetch("/workspaces/members");
  const { data: workspaces } = useFetch("/workspaces/name");
  console.log("teams : ", workspaces);

  // Sample data - replace with your actual data from props
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=1",
      joinedAt: "2024-01-15",
      status: "active",
      workspaceId: "ws1",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@company.com",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=2",
      joinedAt: "2024-02-20",
      status: "active",
      workspaceId: "ws2",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@company.com",
      role: "member",
      avatar: "https://i.pravatar.cc/150?img=3",
      joinedAt: "2024-03-10",
      status: "active",
      workspaceId: "ws1",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.w@company.com",
      role: "member",
      avatar: "https://i.pravatar.cc/150?img=4",
      joinedAt: "2024-03-15",
      status: "active",
      workspaceId: "ws3",
    },
  ]);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || member.role === filterRole;
    const matchesWorkspace =
      filterWorkspace === "all" || member.workspaceId === filterWorkspace;

    return matchesSearch && matchesRole && matchesWorkspace;
  });

  const getWorkspaceName = (workspaceId: string) => {
    const workspace = sampleWorkspaces.find((ws) => ws.id === workspaceId);
    return workspace ? workspace.name : "Unknown Workspace";
  };

  const stats = {
    total: teamMembers.length,
    admins: teamMembers.filter((m) => m.role === "admin").length,
    members: teamMembers.filter((m) => m.role === "member").length,
    workspaces: new Set(teamMembers.map((m) => m.workspaceId)).size,
  };

  const handleCreateMember = (memberData: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...memberData,
      id: Date.now().toString(),
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Workspace Name */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Team Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage members across all workspaces
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span className="font-medium">Team Members</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm">
              Manage workspace members and their permissions
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<User className="w-6 h-6" />}
            label="Total Members"
            value={stats.total}
            color="bg-blue-500"
          />
          {/* <StatCard
            icon={<Crown className="w-6 h-6" />}
            label="Admins"
            value={stats.admins}
            color="bg-purple-500"
          />
          <StatCard
            icon={<Shield className="w-6 h-6" />}
            label="Members"
            value={stats.members}
            color="bg-green-500"
          /> */}
          <StatCard
            icon={<Building2 className="w-6 h-6" />}
            label="Workspaces"
            value={stats.workspaces}
            color="bg-orange-500"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border-[0.5px] border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md border-0 border-gray-200">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 border-[0.5px] border-gray-300 focus:ring-[0.5px] focus:ring-blue-400"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto flex-wrap">
              {/* Role Filter */}
              <Select
                value={filterRole}
                onValueChange={(value: "all" | "admin" | "member") =>
                  setFilterRole(value)
                }
              >
                <SelectTrigger className="w-[140px] border-[0.5px] border-gray-300">
                  <div className="flex items-center gap-2 bg-white">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Role" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white border-0">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="member">Members</SelectItem>
                </SelectContent>
              </Select>

              {/* Workspace Filter */}
              <Select
                value={filterWorkspace}
                onValueChange={setFilterWorkspace}
              >
                <SelectTrigger className="w-[180px] border-[0.5px] border-gray-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <SelectValue placeholder="Workspace" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white border-0">
                  <SelectItem value="all">All Workspaces</SelectItem>
                  {sampleWorkspaces.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <CustomButton
                label="Create Member"
                Icon={UserPlus}
                onClick={() => setIsCreateModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              workspaceName={getWorkspaceName(member.workspaceId)}
            />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No members found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Create Member Modal */}
      {isCreateModalOpen && (
        <CreateMemberModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateMember}
          workspaces={sampleWorkspaces}
          open={isCreateModalOpen}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
    </div>
  </div>
);

// Member Card Component
const MemberCard: React.FC<{
  member: TeamMember;
  workspaceName: string;
}> = ({ member, workspaceName }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
      {/* Workspace Badge at Top */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 truncate max-w-[150px]">
            {workspaceName}
          </span>
        </div>

        <div className="relative">
          <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border-0 p-3"
            >
              <DropdownMenuItem className="hover:bg-gray-50">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50">
                Change Role
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50">
                Switch Workspace
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 hover:bg-red-50">
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Member Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold ring-2 ring-gray-100">
              {member.name.charAt(0)}
            </div>
          )}
          {member.status === "active" && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              member.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {member.role === "admin" ? (
              <Crown className="w-3 h-3" />
            ) : (
              <User className="w-3 h-3" />
            )}
            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            Joined{" "}
            {new Date(member.joinedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {member.status === "invited" && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            Invitation Pending
          </span>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
