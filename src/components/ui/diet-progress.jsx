import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const generateWeeklyData = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const getProgressForDate = (offset) => {
    const date = new Date();
    date.setDate(today.getDate() - offset);
    return {
      day: days[date.getDay()],
      value: Math.floor(Math.random() * 51) + 30, // 30%–80%
    };
  };

  const thisWeek = [];
  const lastWeek = [];

  for (let i = 6; i >= 0; i--) {
    const thisWeekDay = getProgressForDate(i);
    const lastWeekDay = getProgressForDate(i + 7);

    thisWeek.push({
      day: thisWeekDay.day,
      thisWeek: thisWeekDay.value,
      lastWeek: lastWeekDay.value,
    });
  }

  return thisWeek;
};

const data = generateWeeklyData();
console.log('data: ', data);

export default function DietProgress() {
  return (
    <div className="w-full h-80 bg-gray-50 rounded-xl py-4">
      <h2 className="text-base font-semibold mb-3">Diet Progress: This Week vs Last Week</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
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
            stroke="#3b82f6"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
