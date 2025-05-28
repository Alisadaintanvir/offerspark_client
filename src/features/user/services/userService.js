import apiClient, { API_ENDPOINTS } from "../../../lib/api";

export const fetchUsers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.user.list);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiClient.post(API_ENDPOINTS.user.create, userData);
  return response.data;
};
