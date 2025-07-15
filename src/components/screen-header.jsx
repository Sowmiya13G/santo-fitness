import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ScreenHeader({
  title,
  isBack = false,
  titleColor = "text-font_primary",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex items-center justify-center bg-transparent py-3 mt-6">
      {isBack && (
        <button
          onClick={handleBack}
          className="absolute left-3 flex items-center bg-white text-gray-700 p-3 rounded-lg shadow-md ml-3"
        >
          <FaAngleLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className={`text-lg font-semibold ${titleColor}`}>{title}</h1>
    </div>
  );
}
