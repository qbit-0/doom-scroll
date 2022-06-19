import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAppToken } from "../../utility/redditAPI";

export const updateAppToken = createAsyncThunk(
  "auth/updateAppAccessToken",
  async () => {
    return await getAppToken();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    appToken: null,
    userToken: null,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAppToken.fulfilled, (state, action) => {
      state.appToken = action.payload.access_token;
    });
  },
});

export const selectAppToken = (state) => state.auth.appToken;
export const selectUserToken = (state) => state.auth.userToken;
export const selectAccessToken = (state) => {
  const appToken = selectAppToken(state);
  const userToken = selectUserToken(state);
  return userToken ? userToken : appToken;
};

export const { setUserToken } = authSlice.actions;
export default authSlice.reducer;
