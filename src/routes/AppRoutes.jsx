import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ForgotPassword from "../screens/auth/forgot-password";
import Login from "../screens/auth/login";
import SetPassword from "../screens/auth/set-password";
import SplashScreen from "../screens/auth/splash";

import Onboarding from "../screens/auth/Onboarding";
import Camera from "../screens/dashboard/camera";
import Graph from "../screens/dashboard/graph";
import Profile from "../screens/dashboard/profile";
import Recipes from "../screens/dashboard/recipes";
import DashboardLayout from "./DashboardLayout";
import Home from "../screens/Dashboard/home";
export default function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/home" replace /> : <SplashScreen />
        }
      />
      {!isLoggedIn && (
        <>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
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
