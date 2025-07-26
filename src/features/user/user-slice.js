import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    fcm: null,
    userList: [],
  },
  reducers: {
    setFCMToken(state, action) {
      state.token = action.payload;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
    clearFCMToken(state) {
      state.token = null;
    },
  },
});

export const { setFCMToken, clearFCMToken ,setUserList} = authSlice.actions;
export default authSlice.reducer;
