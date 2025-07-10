import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-screen bg-white flex flex-col  items-center justify-center px-4 relative">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
