import React from "react";
// packages
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
// components
import Button from "../../components/Button";
import Input from "../../components/input/input";
import { showToast } from "../../components/toast";
// others
import { forgotPassword } from "../../features/auth/authAPI";
import { forgotPasswordSchema } from "../../utils/validation";

function ForgotPassword() {
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  // ---------------------------------- functionalities ---------------------------------- //
  const onSubmit = async (data) => {
    try {
      const payload = { email: data.email };
      const response = await forgotPassword(payload);

      if (response?.status === 200) {
        showToast("success", "Reset link sent. Please check your email.");
        window.location.href = "mailto:";
        reset();
      }
    } catch (err) {
      showToast(
        "error",
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };
 
  // ---------------------------------- render ui ---------------------------------- //
  return (
    <div className="h-full overflow-hidden  w-screen bg-white flex flex-col items-center justify-center px-6  relative">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8"
        >
          <p className="text-font_primary text-center font-bold text-xl">
            Forgot Password
          </p>
          <Input
            name="email"
            placeholder="Enter email"
            type="email"
            icon={<FiMail />}
            iconPosition="prefix"
          />
          {isSubmitSuccessful && (
            <p className="text-green-500 underline text-sm text-center">
              A password reset link has been sent to your registered email
              address. Please check your inbox (and spam folder) to proceed.
            </p>
          )}

          <div className="w-full absolute bottom-10 left-0 px-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ForgotPassword;
