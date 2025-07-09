import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiPhone, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { phone, password });
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center px-6 pt-32 pb-24 font-poppin relative">
      <div className="w-full max-w-md text-center mt-12">
        <p className="text-font_primary text-base mb-4">Hey there,</p>
        <p className="text-font_primary font-bold text-xl">Welcome back</p>
      </div>

      <div className="w-full max-w-md space-y-4 mt-14">
        <Input
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          className="text-font_secondary underline text-sm text-center"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
      </div>

      <div className="w-full max-w-md absolute bottom-10 px-6">
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
