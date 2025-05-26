import apiClient, { API_ENDPOINTS } from "../../../lib/api";

// Fetch all roles
export const fetchRoles = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.role.list);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

// Create a new role
export const createRole = async (roleData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.role.create, roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

// Update an existing role
export const updateRole = async (roleId, roleData) => {
  try {
    const endpoint = API_ENDPOINTS.role.update.replace(":id", roleId);
    const response = await apiClient.patch(endpoint, roleData);
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

// Delete a role
export const deleteRole = async (roleId) => {
  try {
    const response = await apiClient.delete(`/roles/${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
