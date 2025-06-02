import React from "react";
import useRoles from "../hooks/useRoles";
import RoleFormModal from "../components/RoleFormModal";
import RolesList from "../components/RolesList";
import OverlayModal from "../../../components/common/OverlayModal";

const RolesPage = () => {
  const {
    roles,
    loading,
    error,
    showAddForm,
    setShowAddForm,
    editingRole,
    newRole,
    handleAddRole,
    handleUpdateRole,
    handleEditRole,
    handleDeleteRole,
    handlePermissionChange,
    handleInputChange,
    hasPermission,
    getPermissionGroups,
    setError,
  } = useRoles();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <OverlayModal open={!!error} onClose={() => setError("")} title="Error">
        {error}
      </OverlayModal>
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
            setShowAddForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span className="mr-2">+</span>
          Add Role
        </button>
      </div>

      <RoleFormModal
        visible={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={editingRole ? handleUpdateRole : handleAddRole}
        editingRole={editingRole}
        newRole={newRole}
        handleInputChange={handleInputChange}
        handlePermissionChange={handlePermissionChange}
        hasPermission={hasPermission}
        getPermissionGroups={getPermissionGroups}
      />

      <RolesList
        roles={roles}
        permissionGroups={getPermissionGroups()}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />
    </div>
  );
};

export default RolesPage;
