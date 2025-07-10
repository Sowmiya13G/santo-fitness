import React, { useEffect, useState } from "react";
import { FiLock, FiLogIn, FiPhone } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";
import { login } from "../../features/auth/authAPI";
import { setToken } from "../../features/auth/authSlice";
import { sendFCMToken } from "../../features/user/userAPI";
import { setFCMToken } from "../../features/user/userSlice";
import { requestForToken } from "../../utils/pushNotification";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm();
  const [loading, setLoading] = useState(false);

  const handleSendFCM = () => {
    try {
      const payload = {
        fcmToken: localStorage.getItem("fcmToken"),
      };
      const response = sendFCMToken(payload);
      if (response?.status === 200) {
        dispatch(setFCMToken(response.data?.token));
      }
    } catch (err) {
      const msg = err?.response?.data?.message;
      showToast("error", msg);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      const response = await login(payload);

      if (response?.status === 200) {
        dispatch(setToken(response.data?.token));
        handleSendFCM();
        showToast("success", "Login successful!");
        navigate("/home");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Invalid phone number or password.";
      showToast("error", msg);
    } finally {
      setLoading(false);
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

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 mt-32"
        >
          <Input
            name="phoneNumber"
            placeholder="Enter phone number"
            type="numeric"
            icon={<FiPhone />}
            iconPosition="prefix"
            maxLength={10}
            rules={{
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Enter valid Phone number",
              },
            }}
          />

          <Input
            name="password"
            placeholder="Enter password"
            type="alphanumeric"
            icon={<FiLock />}
            iconPosition="prefix"
            rules={{
              required: "Please enter your password",
              // validate: (value) =>
              //   value !== password || "Passwords do not match",
            }}
          />

          <p
            className="text-font_secondary underline text-sm text-center cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <div className="w-full absolute bottom-10 left-0 px-6">
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              icon={<FiLogIn />}
            >
              Login
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Login;
