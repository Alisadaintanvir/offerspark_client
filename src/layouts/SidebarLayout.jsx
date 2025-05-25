import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import SidebarNav from "../components/SidebarNav";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    // For example:
    // localStorage.removeItem('token');
    // or
    // await authService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 h-16 bg-white shadow-sm z-30 lg:left-64">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side - Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Center - Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
              >
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  Admin User
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircle size={16} className="mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-center shadow-sm">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SidebarLayout;
