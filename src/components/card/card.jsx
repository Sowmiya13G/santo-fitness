// src/components/ui/card.jsx

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-xl shadow bg-white  ${className}`}>{children}</div>
  );
};
