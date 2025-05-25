// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/admin",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  user: {
    profile: "/user/profile",
    updateProfile: "/user/profile",
    list: "/user/list",
  },
  // Add more endpoint categories as needed
};

// API Client
export const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    const config = {
      ...API_CONFIG,
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
      credentials: "include",
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  },

  // HTTP Methods
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  },

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },
};

export default apiClient;
