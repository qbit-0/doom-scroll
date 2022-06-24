import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAppToken } from "../../utils/redditAPI";

export const updateAppToken = createAsyncThunk(
  "auth/updateAppToken",
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

export const selectAppToken = (state: RootState) => state.auth.appToken;
export const selectUserToken = (state: RootState) => state.auth.userToken;
export const selectAccessToken = (state: RootState) => {
  const appToken = selectAppToken(state);
  const userToken = selectUserToken(state);
  return userToken ? userToken : appToken;
};

export const { setUserToken } = authSlice.actions;
export default authSlice.reducer;
