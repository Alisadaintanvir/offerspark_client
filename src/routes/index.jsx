import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import SidebarLayout from "../layouts/SidebarLayout";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";

// Dashboard Pages
import Dashboard from "../features/dashboard/page/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected routes with Sidebar */}
      <Route element={<ProtectedLayout />}>
        <Route element={<SidebarLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
