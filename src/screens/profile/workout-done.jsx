import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import SuccessPage from "@/components/success";
import Success from "../../assets/images/workout-done.svg";

function WorkoutDone() {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <SuccessPage
      title={`Congratulations, You Have Successfully Completed`}
      content={"Exercises is king and nutrition is queen. Combine the two and you will have a kingdom"}
      image={Success}
      button={"Back To Home"}
      onclick={() => navigate("/home")}
    />
  );
}

export default WorkoutDone;
