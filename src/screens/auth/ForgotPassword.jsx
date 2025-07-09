import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";

import { forgotPassword } from "../../features/auth/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleContinue = async () => {
    if (email) {
      try {
        const payload = {
          email: email,
        };
        const response = await forgotPassword(payload);
        if (response?.status === 200) {
          showToast("success", "Reset link sent. Please check your email.");
          window.location.href = "mailto:";
        }
      } catch (err) {
        showToast("error", err?.response?.data?.message);
      } finally {
      }
    } else {
      showToast("warning", "Enter email");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center px-6 pt-32 pb-24 font-poppin relative">
      <div className="w-full max-w-md space-y-8 mt-52">
        <p className="text-font_primary text-center font-bold text-xl">
          Forgot Password
        </p>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
          }}
          type="email"
          icon={<FiMail />}
          iconPosition="prefix"
        />
        <p className="text-green-500 underline text-sm text-center cursor-pointer">
          A password reset link has been sent to your registered email address.
          Please check your inbox (and spam folder) to proceed.
        </p>
      </div>

      <div className="w-full max-w-md absolute bottom-10 px-6">
        <Button onClick={handleContinue}>{"Continue"}</Button>
      </div>
    </div>
  );
}
export default ForgotPassword;
