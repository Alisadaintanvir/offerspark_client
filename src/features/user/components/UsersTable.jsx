import React from "react";
import { User, Mail, Phone, Calendar, Trash2 } from "lucide-react";

const UsersTable = ({ users, onDelete }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.full_name}
                    </div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 flex items-center">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    {user.phone}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-700">
                  {user.is_super_admin
                    ? "Super Admin"
                    : user.role?.name || user.role || "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersTable;
