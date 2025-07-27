// packages
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";
import UserCard from "@/components/card/user-card";

const DietDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6">
      <ScreenHeader title="Diet Details" />
      <div className="h-5" />

      <UserCard
        user={{
          name: "",
          goal: "",
          profileImg: "",
        }}
        onClick={() => navigate("/meals-details")}
        isSwipe={false}
        buttonLabel={isClient ? "Upload Meals Image" : "View More"}
        customButtonClass={"!h-10 !w-auto py-3"}
      />
    </div>
  );
};

export default DietDetailsScreen;
