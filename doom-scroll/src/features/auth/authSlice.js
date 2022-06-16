import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: {},
});

export const selectAccessToken = (state) => state.auth.accessToken;

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
