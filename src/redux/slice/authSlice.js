import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  username: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, username, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.username = username;
      state.userId = userId;
    },
  },
});

export const { SET_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggerIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.username;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
