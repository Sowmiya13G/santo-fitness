import { createSlice } from "@reduxjs/toolkit";

const dailySlice = createSlice({
  name: "dailyLogs",
  initialState: {
    todayLogs: [],
    weeklyLogs: [],
  },
  reducers: {
    setTodayLogs(state, action) {
      state.todayLogs = action.payload;
    },
    setWeekLogs(state, action) {
      state.weeklyLogs = action.payload;
    },
  },
});

export const { setTodayLogs, setWeekLogs } = dailySlice.actions;
export default dailySlice.reducer;
