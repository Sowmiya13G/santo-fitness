import React from "react";

const RenderIconRow = ({ title, leftIcon, rightIcon, rightContent, onAction }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {leftIcon && <span className="text-gradient">{leftIcon}</span>}
        <h2 className="text-base font-medium text-icon">{title}</h2>
      </div>

      {rightContent ? (
        <div>{rightContent}</div>
      ) : rightIcon ? (
        <button onClick={onAction} className="text-icon px-2">
          {rightIcon}
        </button>
      ) : null}
    </div>
  );
};

export default RenderIconRow;
