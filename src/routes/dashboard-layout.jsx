import BottomNav from "@/components/bottom-nav";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen pb-16 ">
      <Outlet />
      <BottomNav />
    </div>
  );
}
