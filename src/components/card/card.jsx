// src/components/ui/card.jsx

export const Card = ({ children, className = "", style, onClick }) => {
  return (
    <div className={`${className} bg-white  `} style={style} onClick={onClick}>
      {children}
    </div>
  );
};
