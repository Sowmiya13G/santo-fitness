import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { setToken } from "../../features/auth/authSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="p-4 font-poppin">
      <Button
        onClick={() => {
          dispatch(setToken(""));
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
}

export default Profile;
