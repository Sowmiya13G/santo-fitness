import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    fcm: null,
  },
  reducers: {
    setFCMToken(state, action) {
      state.token = action.payload;
    },
    clearFCMToken(state) {
      state.token = null;
    },
  },
});

export const { setFCMToken, clearFCMToken } = authSlice.actions;
export default authSlice.reducer;
