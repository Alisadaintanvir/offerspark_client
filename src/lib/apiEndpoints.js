// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    refresh: "/auth/refresh-token",
  },
  user: {
    list: "/users",
    create: "/users",
    update: "/users/:id",
    delete: (id) => `/users/${id}`,
  },
  permission: {
    list: "/permissions",
  },
  role: {
    list: "/roles",
    create: "/roles",
    update: "/roles/:id",
    delete: "/roles/:id",
  },
  // Add more endpoint categories as needed
};

export default API_ENDPOINTS;
