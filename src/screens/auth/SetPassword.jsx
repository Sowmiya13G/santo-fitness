import React, { useEffect, useState } from "react";
import { FiLock, FiPhone } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";
import { login } from "../../features/auth/authAPI";
import { setToken } from "../../features/auth/authSlice";
import { sendFCMToken } from "../../features/user/userAPI";
import { setFCMToken } from "../../features/user/userSlice";
import { requestForToken } from "../../utils/pushNotification";

function SetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendFCM = () => {
    try {
      const payload = {
        fcmToken: localStorage.getItem("fcmToken"),
      };

      const response = sendFCMToken(payload);
      if (response?.status === 200) {
        console.log("response: ", response);
        dispatch(setFCMToken(response.data?.token));
      }
    } catch (err) {
      const msg = err?.response?.data?.message;
      showToast("error", msg);
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    if (phone && password) {
      try {
        const payload = {
          phoneNumber: phone,
          password: password,
        };

        const response = await login(payload);
        if (response?.status === 200) {
          console.log("response: ", response);
          dispatch(setToken(response.data?.token));
          handleSendFCM();
          showToast("success", "Login successful!");
          navigate("/dashboard");
        }
      } catch (err) {
        const msg =
          err?.response?.data?.message || "Invalid phone number or password.";
        showToast("error", msg);
      } finally {
        setLoading(false);
      }
    } else {
      showToast("warning", "Enter values");
    }
  };

  useEffect(() => {
    requestForToken();
  }, []);
  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center px-6 pt-32 pb-24 font-poppin relative">
      <div className="w-full max-w-md text-center mt-12">
        <p className="text-font_primary text-base mb-4">Hey there,</p>
        <p className="text-font_primary font-bold text-xl">Welcome back</p>
      </div>

      <div className="w-full max-w-md space-y-4 mt-32">
        <Input
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) setPhone(value);
          }}
          type="numeric"
          icon={<FiPhone />}
          iconPosition="prefix"
          maxLength={10}
        />

        <Input
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="alphanumeric"
          icon={<FiLock />}
          iconPosition="prefix"
        />

        <p
          className="text-font_secondary underline text-sm text-center cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
      </div>

      <div className="w-full max-w-md absolute bottom-10 px-6">
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}

export default SetPassword;
