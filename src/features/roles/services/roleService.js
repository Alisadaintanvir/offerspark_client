import apiClient, { API_ENDPOINTS } from "../../../lib/api";

// Fetch all roles
export const fetchRoles = async () => {
  const response = await apiClient.get(API_ENDPOINTS.role.list);
  return response.data;
};

// Create a new role
export const createRole = async (roleData) => {
  const response = await apiClient.post(API_ENDPOINTS.role.create, roleData);
  return response.data;
};

// Update an existing role
export const updateRole = async (roleId, roleData) => {
  const endpoint = API_ENDPOINTS.role.update.replace(":id", roleId);
  const response = await apiClient.patch(endpoint, roleData);
  return response.data;
};

// Delete a role
export const deleteRole = async (roleId) => {
  const response = await apiClient.delete(`/roles/${roleId}`);
  return response.data;
};
