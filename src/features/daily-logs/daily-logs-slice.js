import { createSlice } from "@reduxjs/toolkit";

const dailySlice = createSlice({
  name: "dailyLogs",
  initialState: {
    todayLogs: [],
    weekProgress: [],
  },
  reducers: {
    setTodayLogs(state, action) {
      state.todayLogs = action.payload;
    },
    setWeekProgress(state, action) {
      state.weekProgress = action.payload;
    },
  },
});

export const { setTodayLogs, setWeekProgress } = dailySlice.actions;
export default dailySlice.reducer;
