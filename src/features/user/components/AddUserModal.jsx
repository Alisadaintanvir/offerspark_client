import React from "react";
import { Plus, X } from "lucide-react";

const AddUserModal = ({
  open,
  onClose,
  onSubmit,
  roles,
  newUser,
  onInputChange,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 w-full max-w-lg shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details to add a new member
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={newUser.full_name}
                onChange={onInputChange}
                required
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={onInputChange}
                required
                placeholder="Enter email address"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={newUser.phone}
                onChange={onInputChange}
                required
                placeholder="Enter phone number"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={onInputChange}
                required
                placeholder="Enter password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={newUser.role}
                onChange={onInputChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((role) => (
                  <option key={role._id || role.id} value={role._id || role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              name="isActive"
              checked={newUser.isActive}
              onChange={onInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
            />
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Active Status
              </label>
              <p className="text-sm text-gray-500">
                This member will be active in the system
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
