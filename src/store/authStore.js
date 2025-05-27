import { create } from "zustand";
import apiClient, { API_ENDPOINTS } from "../lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  isAuthenticated: false,
  isLoading: true,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),

  checkAuth: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.auth.me);
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Authentication check failed:", error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },
}));
