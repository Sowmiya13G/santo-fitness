import { NavLink } from 'react-router-dom'
import { FaHome, FaChartBar, FaCamera, FaUser, FaSearch } from 'react-icons/fa'

export default function BottomNav() {
  const navItems = [
    { to: '/dashboard', icon: <FaHome />, label: 'Home' },
    { to: '/dashboard/graph', icon: <FaChartBar />, label: 'Graph' },
    { to: '/dashboard/camera', icon: <FaCamera />, label: 'Camera' },
    { to: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Floating Action Button (FAB) */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center z-50">
        <button className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
          <FaSearch className="text-white text-xl" />
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-white rounded-t-3xl shadow-md px-8 py-4 flex justify-between items-center">
        {navItems.slice(0, 2).map(({ to, icon }, i) => (
          <NavLink
            key={i}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-red-600' : 'text-gray-400'}`
            }
          >
            <div className="text-xl">{icon}</div>
          </NavLink>
        ))}

        {/* Spacer for FAB */}
        <div className="w-14" />

        {navItems.slice(2).map(({ to, icon }, i) => (
          <NavLink
            key={i + 2}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-red-600' : 'text-gray-400'}`
            }
          >
            <div className="text-xl">{icon}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
