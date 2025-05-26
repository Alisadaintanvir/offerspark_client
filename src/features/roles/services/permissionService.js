import apiClient, { API_ENDPOINTS } from "../../../lib/api";

// Fetch all available permissions from the API
export const fetchPermissions = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.permission.list);
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};
