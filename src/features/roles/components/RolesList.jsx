import React from "react";
import RoleCard from "./RoleCard";

export default function RolesList({
  roles,
  permissionGroups,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map((role) => (
        <RoleCard
          key={role._id}
          role={role}
          permissionGroups={permissionGroups}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
