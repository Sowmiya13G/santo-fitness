import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
// packages
import { FormProvider, useForm } from "react-hook-form";
import { FiLock, FiLogIn, FiPhone } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/Button";
import Input from "@/components/input/input";
import { showToast } from "@/components/toast";
// others
import { login } from "@/features/auth/authAPI";
import { setToken, setUserData } from "@/features/auth/authSlice";
import { sendFCMToken } from "@/features/user/userAPI";
import { setFCMToken } from "@/features/user/userSlice";
import { requestForToken } from "@/utils/pushNotification";
import { loginSchema } from "@/utils/validation";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ---------------------------------- functionalites ---------------------------------- //

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
    try {
      const payload = {
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      const response = await login(payload);

      if (response?.status === 200) {
        dispatch(setToken(response?.data?.token));
        dispatch(setUserData(response?.data?.user));
        handleSendFCM();
        showToast("success", "Login successful!");
        navigate("/welcome");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Invalid phone number or password.";
      showToast("error", msg);
    }
  };
  // ---------------------------------- use effects ---------------------------------- //

  useEffect(() => {
    requestForToken();
  }, []);
  // ---------------------------------- render ui ---------------------------------- //

  return (
    <div className="h-full overflow-hidden  w-screen bg-white flex flex-col items-center px-6 justify-center ">
      <div className="w-full max-w-md text-center  ">
        <p className="text-font_primary text-base mb-2">Hey there,</p>
        <p className="text-font_primary font-bold text-xl">Welcome back</p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 mt-16"
        >
          <Input
            name="phoneNumber"
            placeholder="Enter phone number"
            type="numeric"
            icon={<FiPhone />}
            iconPosition="prefix"
            maxLength={10}
          />

          <Input
            name="password"
            placeholder="Enter password"
            type="password"
            icon={<FiLock />}
            iconPosition="prefix"
          />

          <p
            className="text-icon underline text-sm text-center cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <div className="w-full absolute bottom-10 left-0 px-6">
            <Button
              type="submit"
              label={"Login"}
              disabled={isSubmitting}
              loading={isSubmitting}
              icon={<FiLogIn />}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Login;
