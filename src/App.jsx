import React, { useEffect } from "react";
import AppRouter from "./routes";
import { useAuthStore } from "./store/authStore";
import apiClient from "./lib/apiClient";

export default function App() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const data = await apiClient.post("/auth/refresh-token");
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          await checkAuth();
        }
      } catch {
        // Not logged in or refresh failed
      } finally {
        setIsLoading(false);
      }
    };
    tryRefresh();
  }, [setAccessToken, setIsLoading, checkAuth]);

  return <AppRouter />;
}
