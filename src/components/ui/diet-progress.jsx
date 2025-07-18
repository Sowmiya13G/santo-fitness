import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";

const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  return daysShort[date.getDay()];
};

export default function DietProgress() {
  const initialData = [
    {
      day: "Sun",
      thisWeek: 0,
      lastWeek: 0,
    },
    {
      day: "Mon",
      thisWeek: 0,
      lastWeek: 0,
    },
    {
      day: "Tue",
      thisWeek: 0,
      lastWeek: 0,
    },
    {
      day: "Wed",
      thisWeek: 0,
      lastWeek: 0,
    },
    {
      day: "Thu",
      thisWeek: 0,
      lastWeek: 0,
    },
    {
      day: "Fri",
      thisWeek: 0,
      lastWeek: 0,
    },
    {
      day: "Sat",
      thisWeek: 0,
      lastWeek: 0,
    },
  ];
  const [chartData, setChartData] = useState(initialData);
  console.log("chartData: ", chartData);
  console.log();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          days: 14,
        };

        const raw = await getDietProgress(params);

        if (!Array.isArray(raw) || raw.length === 0) return;

        // Step 1: Sort by date ascending
        const sorted = [...raw].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        // Step 2: Define date ranges
        const today = new Date();
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - 6); // 6 days ago

        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(thisWeekStart.getDate() - 7);

        const lastWeekEnd = new Date(thisWeekStart);
        lastWeekEnd.setDate(thisWeekStart.getDate() - 1);

        // Step 3: Filter data by date ranges
        const lastWeekRaw = sorted.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= lastWeekStart && entryDate <= lastWeekEnd;
        });

        const thisWeekRaw = sorted.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= thisWeekStart && entryDate <= today;
        });

        // Step 4: Normalize into 7-day structure
        const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const combined = allDays.map((day) => {
          const thisWeekEntry = thisWeekRaw.find(
            (entry) => formatDay(entry.date) === day
          );
          const lastWeekEntry = lastWeekRaw.find(
            (entry) => formatDay(entry.date) === day
          );

          return {
            day,
            thisWeek: thisWeekEntry
              ? Math.round(thisWeekEntry.calories / 20)
              : 0,
            lastWeek: lastWeekEntry
              ? Math.round(lastWeekEntry.calories / 20)
              : 0,
          };
        });

        setChartData(combined);
      } catch (error) {
        console.error("Failed to fetch diet progress:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[300px]  rounded-xl pb-10">
      <h2 className="text-base text-gradient font-semibold">Diet Progress</h2>
      <p className="text-base  mb-3">This Week vs Last Week</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="" />

          <XAxis dataKey="day" axisLine={false} tickLine={false}
            tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />

          <Line
            type="monotone"
            dataKey="thisWeek"
            name="This Week"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="lastWeek"
            name="Last Week"
            stroke="#ccc"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
