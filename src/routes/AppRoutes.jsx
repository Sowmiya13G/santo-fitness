import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import SplashScreen from '../screens/auth/Splash'
import Onboarding from '../screens/auth/Onboarding'
import Login from '../screens/auth/Login'
import OTP from '../screens/auth/OTP'
import ForgotPassword from '../screens/auth/ForgotPassword'

import DashboardLayout from './DashboardLayout'
import Home from '../screens/dashboard/Home'
import Graph from '../screens/dashboard/Graph'
import Camera from '../screens/dashboard/Camera'
import Profile from '../screens/dashboard/Profile'
import Recipes from '../screens/dashboard/Recipes'

export default function AppRoutes() {
  const { isLoggedIn } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      {!isLoggedIn && (
        <>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
      )}

      {isLoggedIn && (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="graph" element={<Graph />} />
          <Route path="camera" element={<Camera />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recipes" element={<Recipes />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
