// packages
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
// component

import Workout from "../../assets/images/workout.svg";

import Button from "@/components/Button";
import ProfileWrapper from "@/components/profile-wrapper";

const ClientWorkoutNotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <ProfileWrapper title="" image={Workout}>
      <div className="w-screen">
        <Button
          label={"Complete Workout"}
          onClick={() => navigate("/profile/workout-done")}
        />
      </div>
    </ProfileWrapper>
  );
};

export default ClientWorkoutNotes;
