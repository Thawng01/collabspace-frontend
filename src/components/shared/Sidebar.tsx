// components/Sidebar.tsx
import React from "react";
import { LayoutDashboard, Users, FolderKanban, BarChart3 } from "lucide-react";
import type { NavItem } from "../../types";
import { Link } from "react-router";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const mainNavItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "dashboard",
      label: "Workspaces",
      icon: LayoutDashboard,
      href: "/workspace",
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
      href: "/projects",
    },
    {
      id: "team",
      label: "Team",
      icon: Users,
      href: "/teams",
    },
    // {
    //     id: "calendar",
    //     label: "Calendar",
    //     icon: Calendar,
    //     href: "/calendar",
    // },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/50 bg-opacity-50 z-20 lg:hidden"
          onClick={() => {
            /* Close sidebar via parent */
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-65 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Workspace Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CollabSpace</h1>
                <p className="text-sm text-gray-400">Project Management</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-4 space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 group transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
                    <span className="text-gray-700 group-hover:text-gray-900">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
