import { createSlice } from "@reduxjs/toolkit";

const dailySlice = createSlice({
  name: "dailyLogs",
  initialState: {
    todayLogs: [],
    weeklyLogs: [],
    pendingLogsList: [],
  },
  reducers: {
    setTodayLogs(state, action) {
      console.log('action: ', action);
      state.todayLogs = action.payload;
    },
    setWeekLogs(state, action) {
      state.weeklyLogs = action.payload;
    },
    setPendingLogsList(state, action) {
      state.pendingLogsList = action.payload;
    },
  },
});

export const { setTodayLogs, setWeekLogs, setPendingLogsList } =
  dailySlice.actions;
export default dailySlice.reducer;
