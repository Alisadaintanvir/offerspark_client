import React, { useEffect } from "react";
import AppRouter from "./routes";
import { useAuthStore } from "./store/authStore";
import apiClient from "./lib/apiClient";
import API_ENDPOINTS from "./lib/apiEndpoints";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const data = await apiClient.post(API_ENDPOINTS.auth.refresh);
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
