import "./App.css";
import { createBrowserRouter } from "react-router";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthLayout from "./layout/AuthLayout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ProfileSetting from "./pages/profiles/ProfileSetting";
import ProfilePage from "./pages/profiles/ProfilePage";
import Workspace from "./pages/workspaces/Workspace";

import ProjectDetail from "./pages/projects/ProjectDetail";
import ColumnPage from "./pages/columns/ColumnPage";
import ProjectPage from "./pages/projects/Project";
import TaskDetails from "./pages/tasks/TaskDetails";
import ActivityPage from "./pages/activity/ActivityPage";
import { WorkSpaceDetail } from "./pages/workspaces/WorkSpaceDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import SettingPage from "./pages/workspaces/SettingPage";
import TeamPage from "./pages/team/TeamPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/workspace",
        element: <Workspace />,
      },
      {
        path: "/workspace/:name/:id",
        element: <WorkSpaceDetail />,
      },
      {
        path: "/workspace/:name/:id/setting",
        element: <SettingPage />,
      },
      {
        path: "/projects",
        element: <ProjectPage />,
      },

      {
        path: "/projects/details/:id",
        element: <ProjectDetail />,
      },
      {
        path: "/:name/:workspaceId/projects/columns/:id",
        element: <ColumnPage />,
      },

      {
        path: "/projects/:projectId/columns/:columnId/tasks/:id",
        element: <TaskDetails />,
      },
      {
        path: "/projects/:projectId/columns/:columnId/tasks/:id/activities",
        element: <ActivityPage />,
      },

      {
        path: "/profile/:userId/setting",
        element: <ProfileSetting />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/teams",
        element: <TeamPage />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default routes;
