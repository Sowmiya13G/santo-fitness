import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

// auth screens
import ForgotPassword from "../screens/auth/forgot-password";
import Login from "../screens/auth/login";
import Onboarding from "../screens/auth/oboarding";
import SetPassword from "../screens/auth/set-password";
import SplashScreen from "../screens/auth/splash";

import LoggedIn from "@/screens/auth/logged-in";
import PersonalData from "@/screens/profile/personal-data";
import Camera from "../screens/dashboard/camera";
import Graph from "../screens/dashboard/graph";
import Home from "../screens/dashboard/home";
import Profile from "../screens/dashboard/profile";
import Recipes from "../screens/dashboard/recipes";
import DashboardLayout from "./DashboardLayout";

export default function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const { userData } = useSelector((state) => state.auth);
  console.log("userData: ", userData?.role);
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
          <Route path="/welcome" element={<LoggedIn />} />
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

      {isLoggedIn && (
        <>
          <Route>
            <Route path="/profile/personal-data" element={<PersonalData />} />
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
