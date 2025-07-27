// packages
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";

const MealDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();


  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6">
      <ScreenHeader title="Meals Details" isBack />
      <div className="h-5" />

      <div className="w-full absolute bottom-10 left-0 px-6">
        <Button label="Compare" onClick={() => navigate("/compare-progress")} />
      </div>
    </div>
  );
};

export default MealDetailsScreen;
