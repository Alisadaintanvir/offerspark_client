import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart,
  FileText,
  Bell,
  ShoppingBag,
  Tag,
  MessageSquare,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tag,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
];

const SidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    // For example:
    // localStorage.removeItem('token');
    // or
    // await authService.logout();
    navigate("/login");
  };

  return (
    <nav className="h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center p-2 text-gray-600 rounded-lg transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 truncate">admin@example.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default SidebarNav;
