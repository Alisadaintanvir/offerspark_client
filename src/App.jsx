import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";
import "antd/dist/reset.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<div>Register Page</div>} />
          <Route
            path="/forgot-password"
            element={<div>Forgot Password Page</div>}
          />
          <Route
            path="/reset-password"
            element={<div>Reset Password Page</div>}
          />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<div>Users Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Route>

        {/* Default route */}
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Navigate to="/dashboard" replace />
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
}
