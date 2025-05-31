import apiClient from "../../../lib/apiClient";
import API_ENDPOINTS from "../../../lib/apiEndpoints";

// Fetch all available permissions from the API
export const fetchPermissions = async () => {
  return await apiClient.get(API_ENDPOINTS.permission.list);
};
