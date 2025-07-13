import React from "react";

export default function ShadowView({ title, children, icon, onAction }) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="bg-white shadow-md rounded-xl px-4 py-5">
      {title && (
        <div
          className={`flex items-center justify-between ${
            hasChildren ? "mb-3" : ""
          }`}
        >
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          {icon && (
            <button
              onClick={onAction}
              className="text-icon text-base"
            >
              {icon}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
