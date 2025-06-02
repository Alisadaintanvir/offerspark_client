import { useState, useEffect } from "react";
import { fetchPermissions } from "../services/permissionService";
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../services/roleService";

export default function useRoles() {
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
    e?.preventDefault && e.preventDefault();
    try {
      const roleData = {
        ...newRole,
        createdAt: new Date().toISOString(),
      };
      const createdRole = await createRole(roleData);
      setRoles([...roles, createdRole]);
      setShowAddForm(false);
      setNewRole({ name: "", description: "", permissions: [] });
    } catch (err) {
      setError("Failed to create role. Please try again later.");
      console.error("Error creating role:", err);
    }
  };

  const handleUpdateRole = async (e) => {
    e?.preventDefault && e.preventDefault();
    try {
      const roleData = {
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
      };
      const result = await updateRole(editingRole._id, roleData);
      const updatedRole = result.data;
      setRoles(
        roles.map((role) =>
          role._id === editingRole._id
            ? { ...updatedRole, permissions: newRole.permissions }
            : role
        )
      );
      setShowAddForm(false);
      setEditingRole(null);
      setNewRole({ name: "", description: "", permissions: [] });
    } catch (err) {
      setError("Failed to update role. Please try again later.");
      console.error("Error updating role:", err);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions || [],
    });
    setShowAddForm(true);
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

  return {
    roles,
    loading,
    error,
    showAddForm,
    setShowAddForm,
    editingRole,
    setEditingRole,
    newRole,
    setNewRole,
    handleAddRole,
    handleUpdateRole,
    handleEditRole,
    handleDeleteRole,
    handlePermissionChange,
    handleInputChange,
    hasPermission,
    getPermissionGroups,
    setError,
  };
}
