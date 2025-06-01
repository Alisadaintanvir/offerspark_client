import React, { useEffect } from "react";
import AppRouter from "./routes";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log("accessToken", accessToken);
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <AppRouter />;
}
