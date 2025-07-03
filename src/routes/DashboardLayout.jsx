import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen pb-16">
      <Outlet />
      <BottomNav />
    </div>
  )
}
