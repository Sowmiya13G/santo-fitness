import { FaAngleLeft, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ScreenHeader({
  title,
  isBack = false,
  titleColor = "text-font_primary",
  isHome = false,
}) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {isHome ? (
        <div className="flex w-full items-center justify-between px-4 mt-3">
          <div>
            <p className="text-base text-icon">Welcome Back,</p>
            <h1 className={`text-xl font-semibold ${titleColor}`}>
              {userData?.name || "User"}
            </h1>
          </div>

          <button
            onClick={() => navigate("/notification")}
            className="p-3 bg-[#F7F8F8] rounded-xl"
          >
            <FaBell className="w-5 h-5 text-icon" />
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mt-3 px-4 ">
          {isBack && (
            <button
              onClick={handleBack}
              className="absolute left-4 flex items-center bg-white text-gray-700 p-2 rounded-lg shadow-md"
            >
              <FaAngleLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className={`text-lg text-center font-semibold ${titleColor}`}>
            {title}
          </h1>
        </div>
      )}
    </div>
  );
}
