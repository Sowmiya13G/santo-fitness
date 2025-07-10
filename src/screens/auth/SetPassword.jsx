import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast";
import { resetPassword } from "../../features/auth/authAPI";

function SetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = { password: "", confirmPassword: "" };

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!strongPasswordRegex.test(data.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, val]) => val)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSetPassword = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        token: token,
        newPassword: data?.password,
      };
      const response = await resetPassword(payload);
      if (response?.status === 200) {
        showToast("success", "Password Reset successful!");
        navigate("/login");
      }
    } catch (err) {
      showToast("error", "Failed to reset password");
      console.error("Failed to reset password:", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center px-6 pt-32 pb-24 font-poppin relative">
      <div className="w-full max-w-md space-y-4 mt-52">
        <p className="text-font_primary text-center font-bold text-xl mb-12">
          Reset Your Password Safely!
        </p>

        <Input
          placeholder="Enter password"
          value={data.password}
          onChange={(e) => {
            setData((prev) => ({ ...prev, password: e.target.value }));
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          type="password"
          icon={<FiLock />}
          iconPosition="prefix"
          error={errors.password}
        />

        <Input
          placeholder="Enter confirm password"
          value={data.confirmPassword}
          onChange={(e) => {
            setData((prev) => ({ ...prev, confirmPassword: e.target.value }));
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
          type="password"
          icon={<FiLock />}
          iconPosition="prefix"
          error={errors.confirmPassword}
        />
      </div>

      <div className="w-full max-w-md absolute bottom-10 px-6">
        <Button
          onClick={handleSetPassword}
          disabled={loading}
          loading={loading}
        >
          {loading ? "Resetting..." : "Reset"}
        </Button>
      </div>
    </div>
  );
}

export default SetPassword;
