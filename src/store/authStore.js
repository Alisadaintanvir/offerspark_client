import { create } from "zustand";
import apiClient from "../lib/apiClient";
import API_ENDPOINTS from "../lib/apiEndpoints";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),

  isAuthenticated: false,
  isLoading: true,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),

  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),

  checkAuth: async () => {
    try {
      const user = await apiClient.get(API_ENDPOINTS.auth.me);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Authentication check failed:", error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },
}));
