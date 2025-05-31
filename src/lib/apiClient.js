import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import API_ENDPOINTS from "./apiEndpoints";

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/admin",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create Axios instance
const axiosInstance = axios.create(API_CONFIG);

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh token if the error is from login or refresh itself
    const isAuthRoute =
      originalRequest.url.includes(API_ENDPOINTS.auth.login) ||
      originalRequest.url.includes(API_ENDPOINTS.auth.refresh);

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.post(
          API_ENDPOINTS.auth.refresh,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        if (newAccessToken) {
          useAuthStore.getState().setAccessToken(newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          useAuthStore.getState().logout();
        }
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    // Propagate backend error message if available
    if (error.response && error.response.data && error.response.data.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

// API Client
export const apiClient = {
  get: (url, config = {}) =>
    axiosInstance.get(url, config).then((res) => res.data),
  post: (url, data = {}, config = {}) =>
    axiosInstance.post(url, data, config).then((res) => res.data),
  put: (url, data = {}, config = {}) =>
    axiosInstance.put(url, data, config).then((res) => res.data),
  patch: (url, data = {}, config = {}) =>
    axiosInstance.patch(url, data, config).then((res) => res.data),
  delete: (url, config = {}) =>
    axiosInstance.delete(url, config).then((res) => res.data),
};

export default apiClient;
