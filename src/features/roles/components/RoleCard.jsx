import React, { useState } from "react";
import { Shield, Trash2, Check, ChevronDown, ChevronRight } from "lucide-react";

const MAX_VISIBLE_PERMISSIONS = 5;
const MAX_SCROLLABLE_PERMISSIONS = 10;

const RoleCard = ({ role, permissionGroups, onEdit, onDelete }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [showAllPermissions, setShowAllPermissions] = useState({});

  const toggleGroup = (type) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleShowAll = (type) => {
    setShowAllPermissions((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{role.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(role)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Shield size={20} />
            </button>
            <button
              onClick={() => onDelete(role._id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {Object.entries(permissionGroups).map(([type, permissions]) => {
            const rolePermissions = permissions.filter((p) =>
              role.permissions.includes(p.code)
            );
            if (rolePermissions.length === 0) return null;
            const expanded = expandedGroups[type];
            const showAll = showAllPermissions[type];
            const visible = showAll
              ? rolePermissions
              : rolePermissions.slice(0, MAX_VISIBLE_PERMISSIONS);
            const hiddenCount =
              rolePermissions.length - MAX_VISIBLE_PERMISSIONS;
            const isScrollable =
              rolePermissions.length > MAX_SCROLLABLE_PERMISSIONS;

            return (
              <div key={type}>
                <div
                  className="py-2 cursor-pointer select-none flex items-center"
                  onClick={() => toggleGroup(type)}
                  role="button"
                  tabIndex={0}
                >
                  {expanded ? (
                    <ChevronDown size={16} className="mr-2 text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="mr-2 text-gray-400" />
                  )}
                  <span className="font-medium text-gray-700 flex-1">
                    {type}
                  </span>
                  <span className="ml-2 bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {rolePermissions.length}
                  </span>
                </div>
                {expanded && (
                  <div
                    className={
                      isScrollable
                        ? "flex flex-wrap gap-2 mt-2 mb-4 max-h-32 overflow-y-auto pr-2"
                        : "flex flex-wrap gap-2 mt-2 mb-4"
                    }
                  >
                    {visible.map((permission) => (
                      <span
                        key={permission.code}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Check size={12} className="mr-1" />
                        {permission.label}
                      </span>
                    ))}
                    {hiddenCount > 0 && !showAll && (
                      <button
                        className="text-xs text-blue-600 underline ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleShowAll(type);
                        }}
                        type="button"
                      >
                        +{hiddenCount} more
                      </button>
                    )}
                    {showAll && hiddenCount > 0 && (
                      <button
                        className="text-xs text-blue-600 underline ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleShowAll(type);
                        }}
                        type="button"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
          Created: {new Date(role.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
