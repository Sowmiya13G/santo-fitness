// packages
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";
import ProfileWrapper from "@/components/profile-wrapper";
import Workout from "../../assets/images/panCake.svg";

const MealDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  return (
    <ProfileWrapper
      title=""
      image={Workout}
      bgColor="bg-red_25"
      imgClass={"scale-150 rounded-none object-contain"}
    >
      {/* <div className="w-full absolute bottom-10 left-0 px-6">
        <Button
          label="SubmitProv"
          onClick={() => navigate("/compare-progress")}
        />
      </div> */}
    </ProfileWrapper>
  );
};

export default MealDetailsScreen;
