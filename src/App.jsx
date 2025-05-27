import React, { useEffect } from "react";
import AppRouter from "./routes";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <AppRouter />;
}
