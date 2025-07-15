import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    userData: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken, setUserData } = authSlice.actions;
export default authSlice.reducer;
