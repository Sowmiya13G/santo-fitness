// src/components/ui/card.jsx

export const Card = ({ children, className = "", style }) => {
  return (
    <div className={`${className} bg-white  `} style={style}>
      {children}
    </div>
  );
};
