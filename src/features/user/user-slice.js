import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    fcm: null,
    userList: [],
    trainerList: [],
    topClient: [],
    isPlanExpired: false,
  },
  reducers: {
    setFCMToken(state, action) {
      state.token = action.payload;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
    setTrainerList(state, action) {
      state.trainerList = action.payload;
    },
    setTopClient(state, action) {
      state.topClient = action.payload;
    },
    setPlanExpired(state, action) {
      state.isPlanExpired = action.payload;
    },
    clearFCMToken(state) {
      state.token = null;
    },
  },
});

export const {
  setFCMToken,
  clearFCMToken,
  setUserList,
  setTrainerList,
  setTopClient,
  setPlanExpired,
} = authSlice.actions;
export default authSlice.reducer;
