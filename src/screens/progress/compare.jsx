import { useEffect } from "react";
// packages
import {
  FaAngleRight,
  FaCalendarAlt
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";
const CompareScreen = () => {
  const { userData } = useSelector((state) => state.auth);

  const isClient = userData?.role === "client";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUsersList = async () => {
    try {
      // setLoading(true);
    } catch (err) {
      console.error("Failed to fetch clients list:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <div className="w-screen space-y-6 text-gray-800 hide-scrollbar px-5 py-6">
      <ScreenHeader title="Comparison" isBack />
      <div className="h-5" />
      <div className="space-y-5">
        <div className="bg-feild_primay px-4 py-5 rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt size={20} color="#8E8E93" />
            <p className="text-icon  text-base">Select Month</p>
          </div>
          <button onClick={() => navigate("/")}>
            <FaAngleRight size={20} color="#8E8E93" />
          </button>
        </div>
        <div className="bg-feild_primay px-4 py-5 rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt size={20} color="#8E8E93" />
            <p className="text-icon  text-base">Select Month</p>
          </div>
          <button onClick={() => navigate("/")}>
            <FaAngleRight size={20} color="#8E8E93" />
          </button>
        </div>
      </div>
      <div className="w-full absolute bottom-10 left-0 px-6">
        <Button label="Compare" onClick={() => navigate("/compare-progress")} />
      </div>
    </div>
  );
};

export default CompareScreen;
