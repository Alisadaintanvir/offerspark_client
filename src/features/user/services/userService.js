import apiClient from "../../../lib/apiClient";
import API_ENDPOINTS from "../../../lib/apiEndpoints";

export const fetchUsers = async () => {
  return await apiClient.get(API_ENDPOINTS.user.list);
};

export const createUser = async (userData) => {
  return await apiClient.post(API_ENDPOINTS.user.create, userData);
};
