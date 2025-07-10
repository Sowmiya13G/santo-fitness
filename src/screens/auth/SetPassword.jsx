import React from "react";
// packages
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
// components
import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";
// others
import { resetPassword } from "../../features/auth/authAPI";
import { setPasswordSchema } from "../../utils/validation";

function SetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
 
  const methods = useForm({
    resolver: yupResolver(setPasswordSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ---------------------------------- functionalites ---------------------------------- //
  const onSubmit = async (data) => {
    try {
      const payload = {
        token: token,
        newPassword: data.password,
      };

      const response = await resetPassword(payload);
      if (response?.status === 200) {
        showToast("success", "Password Reset successful!");
        navigate("/login");
      }
    } catch (err) {
      showToast("error", "Failed to reset password");
      console.error("Reset error:", err);
    }
  };

  // ---------------------------------- render ui ---------------------------------- //
  return (
    <div className="h-[100dvh] w-screen bg-white flex flex-col items-center px-6 justify-center font-poppin">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <p className="text-font_primary text-center font-bold text-xl mb-8">
            Reset Your Password Safely!
          </p>

          <Input
            name="password"
            placeholder="Enter password"
            type="password"
            icon={<FiLock />}
            iconPosition="prefix"
          />

          <Input
            name="confirmPassword"
            placeholder="Enter confirm password"
            type="password"
            icon={<FiLock />}
            iconPosition="prefix"
          />

          <div className="w-full absolute bottom-10 left-0 px-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default SetPassword;
