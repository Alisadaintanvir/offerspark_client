import React from "react";
import { X, Save } from "lucide-react";

export default function RoleFormModal({
  visible,
  onClose,
  onSubmit,
  editingRole,
  newRole,
  handleInputChange,
  handlePermissionChange,
  hasPermission,
  getPermissionGroups,
}) {
  if (!visible) return null;

  return (
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
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={onSubmit} className="h-full">
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
                        <h4 className="font-medium text-gray-900">{type}</h4>
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
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="role-form"
            onClick={onSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <Save size={20} className="mr-2" />
            {editingRole ? "Save Changes" : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
