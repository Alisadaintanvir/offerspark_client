import apiClient from "../../../lib/apiClient";
import API_ENDPOINTS from "../../../lib/apiEndpoints";

// Fetch all roles
export const fetchRoles = async () => {
  return await apiClient.get(API_ENDPOINTS.role.list);
};

// Create a new role
export const createRole = async (roleData) => {
  return await apiClient.post(API_ENDPOINTS.role.create, roleData);
};

// Update an existing role
export const updateRole = async (roleId, roleData) => {
  const endpoint = API_ENDPOINTS.role.update.replace(":id", roleId);
  return await apiClient.patch(endpoint, roleData);
};

// Delete a role
export const deleteRole = async (roleId) => {
  return await apiClient.delete(`/roles/${roleId}`);
};
