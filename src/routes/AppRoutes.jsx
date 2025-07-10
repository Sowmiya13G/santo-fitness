import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ForgotPassword from "../screens/auth/ForgotPassword";
import Login from "../screens/auth/Login";
import OTP from "../screens/auth/OTP";
import Onboarding from "../screens/auth/Onboarding";
import SetPassword from "../screens/auth/SetPassword";
import SplashScreen from "../screens/auth/Splash";

import Camera from "../screens/dashboard/Camera";
import Graph from "../screens/dashboard/Graph";
import Home from "../screens/dashboard/Home";
import Profile from "../screens/dashboard/Profile";
import Recipes from "../screens/dashboard/Recipes";
import DashboardLayout from "./DashboardLayout";


export default function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />

      {!isLoggedIn && (
        <>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<SetPassword />} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/activity" element={<Graph />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<Recipes />} />
          </Route>
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
