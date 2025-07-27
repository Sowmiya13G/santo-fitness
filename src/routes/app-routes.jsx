import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

// Public Screens
import ForgotPassword from "@/screens/auth/forgot-password";
import Login from "@/screens/auth/login";
import Onboarding from "@/screens/auth/oboarding";
import SetPassword from "@/screens/auth/set-password";
import SplashScreen from "@/screens/auth/splash";

// Layout
import DashboardLayout from "@/routes/dashboard-layout";

// Dashboard Screens
import Camera from "@/screens/dashboard/camera";
import Graph from "@/screens/dashboard/graph";
import Home from "@/screens/dashboard/home";
import LoggedIn from "@/screens/dashboard/logged-in";
import Notification from "@/screens/dashboard/notification";
import Recipes from "@/screens/dashboard/recipes";

// Profile Screens
import Profile from "@/screens/dashboard/profile";
import ClientReport from "@/screens/profile/client-report";
import ClientWorkoutNotes from "@/screens/profile/client-workout";
import PersonalData from "@/screens/profile/personal-data";
import TrainerPostReport from "@/screens/profile/trainer-report";
import TrainerWorkoutNotes from "@/screens/profile/trainer-workout";
import WorkoutDone from "@/screens/profile/workout-done";

// Progress Screens
import CameraScreen from "@/screens/progress/camera-screen";
import CompareScreen from "@/screens/progress/compare";
import ResultScreen from "@/screens/progress/result";

// Diet Screens
import DietDetailsScreen from "@/screens/diet/diet-details";
import MealDetailsScreen from "@/screens/diet/meals-details";

export default function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const { userData } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SplashScreen />} />
      {!isLoggedIn && (
        <>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<SetPassword />} />
        </>
      )}

      {/* Private Routes */}
      {isLoggedIn && (
        <>
          <Route path="/welcome" element={<LoggedIn />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/personal-data" element={<PersonalData />} />
          <Route path="/profile/add-new-person" element={<PersonalData />} />
          <Route path="/profile/testing-reports" element={<ClientReport />} />
          <Route
            path="/profile/testing-reports-trainer"
            element={<TrainerPostReport />}
          />
          <Route
            path="/profile/workout-notes"
            element={<ClientWorkoutNotes />}
          />
          <Route
            path="/profile/workout-notes-trainer"
            element={<TrainerWorkoutNotes />}
          />
          <Route path="/profile/workout-done" element={<WorkoutDone />} />

          {/* Progress */}
          <Route path="/camera-screen" element={<CameraScreen />} />
          <Route path="/compare-progress" element={<CompareScreen />} />
          <Route path="/result" element={<ResultScreen />} />

          {/* Diet */}
          <Route path="/meals-details" element={<MealDetailsScreen />} />

          {/* Notifications */}
          <Route path="/notification" element={<Notification />} />

          {/* Main Layout Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/activity" element={<Graph />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/diet-details" element={<DietDetailsScreen />} />
          </Route>
        </>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
