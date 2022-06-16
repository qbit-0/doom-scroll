import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const REDDIT_ACCESS_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const CLIENT_ID = "LAo7rLD7LwxNjuyP3V5-1w";
const APP_ONLY_GRANT_TYPE = "https://oauth.reddit.com/grants/installed_client";
const DO_NOT_TRACK_THIS_DEVICE = "DO_NOT_TRACK_THIS_DEVICE";

export const retrieveAppAccessToken = createAsyncThunk(
  "auth/retrieveAppAccessToken",
  async () => {
    const url = new URL(REDDIT_ACCESS_TOKEN_URL);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${window.btoa(`${CLIENT_ID}:`).toString("base64")}`,
    };

    const body = new URLSearchParams();
    body.append("grant_type", APP_ONLY_GRANT_TYPE);
    body.append("device_id", DO_NOT_TRACK_THIS_DEVICE);

    const response = await fetch(url.href, {
      method: "POST",
      headers: headers,
      body: body,
    });

    const json = await response.json();

    return json;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    appAccessToken: null,
    userAccessToken: null,
  },
  reducers: {
    setUserAccessToken: (state, action) => {
      state.userAccessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(retrieveAppAccessToken.pending, (state, action) => {
    })
    .addCase(retrieveAppAccessToken.fulfilled, (state, action) => {
      state.appAccessToken = action.payload.access_token;
    })
    .addCase(retrieveAppAccessToken.rejected, (state, action) => {

    })
  },
});

export const selectAppAccessToken = (state) => state.auth.appAccessToken;
export const selectUserAccessToken = (state) => state.auth.userAccessToken;

export const { setUserAccessToken } = authSlice.actions;
export default authSlice.reducer;
