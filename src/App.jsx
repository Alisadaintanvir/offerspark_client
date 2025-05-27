import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("hi");

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
