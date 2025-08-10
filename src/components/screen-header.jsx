import { FaAngleLeft, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ScreenHeader({
  title,
  isBack = false,
  titleColor = "text-font_primary",
  isHome = false,
  onBack,
  headerStyle = "",
}) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const handleBack = () => {
    navigate(-1);
    if (onBack) onBack();
  };

  return (
    <>
      {isHome ? (
        <div
          className={`w-full z-50 text-md absolute left-0 top-0 flex items-center justify-between px-4 h-20 bg-white/70 backdrop-blur-sm ${headerStyle}`}
        >
          <div>
            <p className="text-base text-icon">Welcome Back e,</p>
            <h1 className={`text-md font-semibold ${titleColor}`}>
              {userData?.name || "User"}
            </h1>
          </div>

          {/* <button
            onClick={() => navigate("/notification")}
            className="p-3 rounded-xl"
          >
            <FaBell className="w-5 h-5 text-icon" />
          </button> */}
        </div>
      ) : (
        <div
          className={`w-full absolute z-50 left-0 top-0 flex items-center justify-center h-14  ${
            title && "backdrop-blur-sm bg-white/70"
          }  ${headerStyle}`}
        >
          {isBack && (
            <button
              onClick={handleBack}
              className="absolute left-4 flex items-center bg-white text-gray-700 p-2 rounded-lg shadow-md"
            >
              <FaAngleLeft className="w-5 h-5" />
            </button>
          )}
          <p className={`text-lg text-center font-semibold ${titleColor}`}>
            {title}
          </p>
        </div>
      )}
      <div className="h-2"></div>
    </>
  );
}
