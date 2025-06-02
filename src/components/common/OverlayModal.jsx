import React from "react";

export default function OverlayModal({
  open,
  onClose,
  title,
  children,
  className = "",
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 className="text-xl font-bold mb-4 text-red-600">{title}</h2>
        )}
        <div className="text-gray-800">{children}</div>
      </div>
    </div>
  );
}
