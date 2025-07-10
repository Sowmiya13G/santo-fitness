import React from "react";
import { FiMail } from "react-icons/fi";
import { useForm, FormProvider } from "react-hook-form";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";
import { forgotPassword } from "../../features/auth/authAPI";

function ForgotPassword() {
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    if (data.email) {
      try {
        const payload = { email: data.email };
        const response = await forgotPassword(payload);

        if (response?.status === 200) {
          showToast("success", "Reset link sent. Please check your email.");
          window.location.href = "mailto:";
          reset(); // reset the form after successful submission
        }
      } catch (err) {
        showToast(
          "error",
          err?.response?.data?.message || "Something went wrong"
        );
      }
    } else {
      showToast("warning", "Enter email");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center px-6 pt-32 pb-24 font-poppin relative">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8 mt-52"
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
            rules={{
              required: "Mail ID is required",
            }}
          />

          {isSubmitSuccessful && (
            <p className="text-green-500 underline text-sm text-center">
              A password reset link has been sent to your registered email
              address. Please check your inbox (and spam folder) to proceed.
            </p>
          )}

          <div className="w-full absolute bottom-10 left-0 px-6">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ForgotPassword;
