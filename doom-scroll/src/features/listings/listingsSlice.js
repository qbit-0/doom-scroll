import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectAppAccessToken, selectUserAccessToken } from "../auth/authSlice";

const BASE_URL = "https://oauth.reddit.com";

export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async ({ pathname, params }, thunkAPI) => {
    const userAccessToken = selectUserAccessToken(thunkAPI.getState());
    const appAccessToken = selectAppAccessToken(thunkAPI.getState());

    let accessToken = null;
    if (userAccessToken !== null) {
      accessToken = userAccessToken;
    } else if (appAccessToken !== null) {
      accessToken = appAccessToken;
    }

    const url = new URL(`${BASE_URL}${pathname}`);
    const stringUrl = `${url.href}?${params.toString()}`;

    const headers = {
      Authorization: `bearer ${accessToken}`,
    };

    const response = await fetch(stringUrl, {
      method: "GET",
      headers: headers,
    });

    const json = await response.json();
    return json;
  }
);

export const listingSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)){
          state.listings = [...action.payload]
        } else {
          state.listings = [action.payload];
        }
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectListings = (state) => state.listings.listings;
export const selectIsLoading = (state) => state.listings.isLoading;
export const selectHasError = (state) => state.listings.hasError;

export const {} = listingSlice.actions;
export default listingSlice.reducer;
