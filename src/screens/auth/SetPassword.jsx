import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";
import { resetPassword } from "../../features/auth/authAPI";

function SetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const methods = useForm({ mode: "onChange" });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const password = watch("password");

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

  return (
  
    <div className="h-screen w-screen bg-white flex flex-col items-center px-6 pt-32 pb-24 font-poppin ">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-52"
        >
          <p className="text-font_primary text-center font-bold text-xl mb-12">
            Reset Your Password Safely!
          </p>

          <Input
            name="password"
            placeholder="Enter password"
            type="password"
            icon={<FiLock />}
            iconPosition="prefix"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                message:
                  "Must include uppercase, lowercase, number, and special char",
              },
            }}
          />

          <Input
            name="confirmPassword"
            placeholder="Enter confirm password"
            type="password"
            icon={<FiLock />}
            iconPosition="prefix"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value !== password || "Passwords do not match",
            }}
          />

          <div className="w-full absolute self-center bottom-10 px-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {"Reset"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
 
  );
}

export default SetPassword;
