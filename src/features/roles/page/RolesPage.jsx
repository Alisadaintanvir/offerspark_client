import React, { useState, useEffect } from "react";
import { Plus, X, Save, Trash2, Shield, Check } from "lucide-react";
import { fetchPermissions } from "../services/permissionService";
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../services/roleService";
import RoleCard from "../components/RoleCard";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  // Fetch all available permissions
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const result = await fetchPermissions();
        setPermissions(result.data);
      } catch (err) {
        setError("Failed to fetch permissions. Please try again later.");
        console.error("Error loading permissions:", err);
      }
    };

    loadPermissions();
  }, []);

  // Fetch roles and their permissions
  useEffect(() => {
    const loadRoles = async () => {
      try {
        setLoading(true);
        const result = await fetchRoles();
        setRoles(result.data);
      } catch (err) {
        console.error("Error loading roles:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      const roleData = {
        ...newRole,
        createdAt: new Date().toISOString(),
      };

      // Create new role
      const createdRole = await createRole(roleData);
      setRoles([...roles, createdRole]);

      setShowAddForm(false);
      setNewRole({
        name: "",
        description: "",
        permissions: [],
      });
    } catch (err) {
      setError("Failed to create role. Please try again later.");
      console.error("Error creating role:", err);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      const roleData = {
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
      };

      // Update existing role
      const updatedRole = await updateRole(editingRole._id, roleData);
      console.log("Updated role:", updatedRole); // Debug log

      // Update the roles list with the new data
      setRoles(
        roles.map((role) =>
          role._id === editingRole._id
            ? { ...updatedRole, permissions: newRole.permissions }
            : role
        )
      );

      setShowAddForm(false);
      setEditingRole(null);
      setNewRole({
        name: "",
        description: "",
        permissions: [],
      });
    } catch (err) {
      setError("Failed to update role. Please try again later.");
      console.error("Error updating role:", err);
    }
  };

  const handleEditRole = async (role) => {
    try {
      setEditingRole(role);
      setNewRole({
        name: role.name,
        description: role.description,
        permissions: role.permissions || [],
      });
      setShowAddForm(true);
    } catch (err) {
      setError("Failed to load role. Please try again later.");
      console.error("Error loading role:", err);
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await deleteRole(roleId);
        setRoles(roles.filter((role) => role._id !== roleId));
      } catch (err) {
        setError("Failed to delete role. Please try again later.");
        console.error("Error deleting role:", err);
      }
    }
  };

  const handlePermissionChange = (permissionCode, checked) => {
    setNewRole((prev) => {
      const updatedPermissions = checked
        ? [...prev.permissions, permissionCode]
        : prev.permissions.filter((p) => p !== permissionCode);

      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasPermission = (permissionCode) => {
    return newRole.permissions.includes(permissionCode);
  };

  const getPermissionGroups = () => {
    const groups = {};
    // Handle the new permission structure
    Object.entries(permissions).forEach(([type, actions]) => {
      groups[type] = Object.entries(actions).map(([action, code]) => ({
        code,
        action,
        label: `${action} ${type}`,
        type,
      }));
    });
    return groups;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Roles & Permissions
          </h1>
          <p className="text-gray-600">
            Manage user roles and their permissions
          </p>
        </div>
        <button
          onClick={() => {
            setEditingRole(null);
            setNewRole({
              name: "",
              description: "",
              permissions: [],
            });
            setShowAddForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Role
        </button>
      </div>

      {/* Add/Edit Role Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-xl w-full max-w-4xl shadow-2xl transform transition-all max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingRole ? "Edit Role" : "Add New Role"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingRole
                    ? "Modify role details and permissions"
                    : "Create a new role with specific permissions"}
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form
                onSubmit={editingRole ? handleUpdateRole : handleAddRole}
                className="h-full"
              >
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Role Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newRole.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter role name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={newRole.description}
                        onChange={handleInputChange}
                        placeholder="Enter role description"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Permissions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(getPermissionGroups()).map(
                        ([type, permissions]) => (
                          <div
                            key={type}
                            className="bg-gray-50 rounded-lg p-4 space-y-3"
                          >
                            <h4 className="font-medium text-gray-900">
                              {type}
                            </h4>
                            <div className="space-y-2">
                              {permissions.map((permission) => (
                                <label
                                  key={permission.code}
                                  className="flex items-center space-x-3"
                                >
                                  <input
                                    type="checkbox"
                                    checked={hasPermission(permission.code)}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        permission.code,
                                        e.target.checked
                                      )
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {permission.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="sticky bottom-0 flex justify-end space-x-4 p-6 border-t bg-gray-50">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2.5 text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={editingRole ? handleUpdateRole : handleAddRole}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
              >
                <Save size={20} className="mr-2" />
                {editingRole ? "Save Changes" : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <RoleCard
            key={role._id}
            role={role}
            permissionGroups={getPermissionGroups()}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
          />
        ))}
      </div>
    </div>
  );
};

export default RolesPage;
