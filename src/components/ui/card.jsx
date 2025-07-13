// src/components/ui/card.jsx

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-xl shadow bg-white p-4 ${className}`}>
      {children}
    </div>
  );
};
