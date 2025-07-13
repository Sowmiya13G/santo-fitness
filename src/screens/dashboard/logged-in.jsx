import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import SuccessPage from "@/components/success";
import Success from "../../assets/images/logged-in.svg";

function LoggedIn() {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <SuccessPage
      title={`Welcome, ${userData?.name}`}
      content={"You are all set now, let’s reach your goals together with us"}
      image={Success}
      button={"Go To Home"}
      onclick={() => navigate("/home")}
    />
  );
}

export default LoggedIn;
