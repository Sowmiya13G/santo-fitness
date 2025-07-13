import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ScreenHeader({ title, isBack = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex items-center justify-center bg-white py-3 mt-2">
      {isBack && (
        <button
          onClick={handleBack}
          className="absolute left-3 flex items-center text-gray-700 p-3 rounded-md shadow-md"
        >
          <FaAngleLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
}
