import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";
import { getProgressData } from "@/features/progress/progress-api";

const ResultScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();
  const location = useLocation();

  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(location.search);
  const startMonth = query.get("startMonth");
  const startYear = query.get("startYear");
  const endMonth = query.get("endMonth");
  const endYear = query.get("endYear");
  const targetId = query.get("targetId");

  useEffect(() => {
    if (startMonth && startYear && endMonth && endYear) {
      fetchProgressList();
    }
  }, [startMonth, startYear, endMonth, endYear]);

  const fetchProgressList = async () => {
    setLoading(true);
    try {
      const response = await getProgressData({
        startMonth: startMonth.toLowerCase(),
        startYear,
        endMonth: endMonth.toLowerCase(),
        endYear,
        targetId,
      });

      if (Array.isArray(response?.progress)) {
        setProgressData(response.progress);
        setLoading(false);
      } else {
        setProgressData([]);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      console.error("Failed to fetch progress:", err);
    }
  };

  const getImageByType = (data, type) =>
    data?.images?.find(
      (img) => img.progressType?.toLowerCase() === type?.toLowerCase()
    )?.url || null;

  const [startData, endData] = progressData;

  const getAvailableTypes = () => {
    const allTypes = [...(startData?.images || []), ...(endData?.images || [])]
      .map((img) => img.progressType?.toLowerCase())
      .filter(Boolean);
    return Array.from(new Set(allTypes));
  };

  const availableTypes = getAvailableTypes();

  const formatTypeLabel = (type) =>
    type.charAt(0).toUpperCase() + type.slice(1) + " Facing";

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-4 py-6">
      <ScreenHeader title="Result" isBack />
      {/* <div className="h-5" /> */}

      <div className="flex flex-row items-center justify-between px-2">
        <p className="text-icon font-semibold text-xl capitalize">
          {startMonth}
        </p>
        <p className="text-icon font-semibold text-xl capitalize">{endMonth}</p>
      </div>
      {loading ? (
          <p className="text-center text-base text-icon">loading...!</p>
      ) : (
        <div className="space-y-6 mt-6">
          {progressData.length === 2 ? (
            availableTypes.map((type) => (
              <div key={type} className="flex flex-col items-center space-y-2">
                <p className="text-sm font-medium text-icon text-center mb-3">
                  {formatTypeLabel(type)}
                </p>
                <div className="flex flex-row items-center justify-between w-full ">
                  <img
                    src={getImageByType(startData, type)}
                    alt={`start-${type}`}
                    className="w-36 h-36 object-cover rounded-lg border"
                  />
                  <img
                    src={getImageByType(endData, type)}
                    alt={`end-${type}`}
                    className="w-36 h-36 object-cover rounded-lg border"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-icon">
              No comparison data available.
            </p>
          )}
        </div>
      )}
      {/* <div className="w-full absolute bottom-10 left-0 px-6">
        <Button label="Back to Home" onClick={() => navigate("/home")} />
      </div> */}
    </div>
  );
};

export default ResultScreen;
