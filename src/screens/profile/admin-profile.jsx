import { setToken } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className=" h-full bg-white space-y-6 text-gray-800 ">
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
};

export default AdminProfile;
