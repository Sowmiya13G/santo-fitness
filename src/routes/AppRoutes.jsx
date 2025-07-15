import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

// auth screens
import ForgotPassword from "../screens/auth/forgot-password";
import Login from "../screens/auth/login";
import Onboarding from "../screens/auth/oboarding";
import SetPassword from "../screens/auth/set-password";
import SplashScreen from "../screens/auth/splash";

import LoggedIn from "@/screens/dashboard/logged-in";
import AddNewPerson from "@/screens/profile/add-new-person";
import ClientReport from "@/screens/profile/client-report";
import ClientWorkoutNotes from "@/screens/profile/client-workout";
import PersonalData from "@/screens/profile/personal-data";
import TrainerPostReport from "@/screens/profile/trainer-report";
import TrainerWorkoutNotes from "@/screens/profile/trainer-workout";
import WorkoutDone from "@/screens/profile/workout-done";
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
      <Route path="/" element={<SplashScreen />} />

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
          <Route path="/welcome" element={<LoggedIn />} />
          <Route path="/profile/personal-data" element={<PersonalData />} />
          <Route path="/profile/testing-reports" element={<ClientReport />} />
          <Route
            path="/profile/workout-notes"
            element={<ClientWorkoutNotes />}
          />
          <Route
            path="/profile/workout-notes-trainer"
            element={<TrainerWorkoutNotes />}
          />
          <Route
            path="/profile/testing-reports-trainer"
            element={<TrainerPostReport />}
          />
          <Route path="/profile/add-new-person" element={<AddNewPerson />} />
          <Route path="/profile/workout-done" element={<WorkoutDone />} />
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
