import AuthLayout from "../layouts/AuthLayout";
import SidebarLayout from "../layouts/SidebarLayout";
import { ROLES } from "../lib/constants";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../features/dashboard/page/Dashboard";
import UsersPage from "../features/user/page/UsersPage";
import RolesPage from "../features/roles/page/RolesPage";

export const appRoutes = [
  // Authentication Routes (using AuthLayout)
  {
    path: "/login",
    element: <LoginPage />,
    layout: AuthLayout, // Specify the layout for this route
    isPublic: true, // Indicates that this route doesn't require authentication
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    layout: SidebarLayout,
    isPublic: true,
    // requiredRoles: [ROLES.ADMIN],
  },
  {
    path: "/users",
    element: <UsersPage />,
    layout: SidebarLayout,
    isPublic: true,
    // requiredRoles: [ROLES.ADMIN],
  },
  {
    path: "/roles",
    element: <RolesPage />,
    layout: SidebarLayout,
    isPublic: true,
    // requiredRoles: [ROLES.ADMIN],
  },
];
