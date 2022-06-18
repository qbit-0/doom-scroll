import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { navListings } from "../../utility/navListings";
import { fetchReddit } from "../../utility/redditAPI";

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async ({ accessToken, pathname, search }) => {
    const params = new URLSearchParams(search);

    return await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: params.toString(),
    });
  }
);

export const appendAfter = createAsyncThunk(
  "listings/appendAfter",
  async ({ accessToken, pathname, search, path }, thunkAPI) => {
    const params = new URLSearchParams(search);
    const listings = selectListings(thunkAPI.getState());
    const listing = navListings(listings, path);
    params.append("after", listing.data.after);

    return {
      result: await fetchReddit({
        accessToken: accessToken,
        pathname: pathname,
        search: params.toString(),
      }),
      path: path,
    };
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    pathname: "",
    search: "",
    listings: [],
  },
  reducers: {
    updatePathname: (state, action) => {
      state.pathname = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.listings = action.payload;
        } else {
          state.listings = [action.payload];
        }
      })
      .addCase(appendAfter.fulfilled, (state, action) => {
        const { result, path } = action.payload;
        const listings = state.listings;
        const listing = navListings(listings, path);
        listing.data.after = result.data.after;
        listing.data.dist += result.data.dist;
        listing.data.children.push(...result.data.children);
      });
  },
});

export const selectPathname = (state) => state.listings.pathname;
export const selectSearch = (state) => state.listings.search;
export const selectListings = (state) => state.listings.listings;

export const { updatePathname, updateSearch } = listingsSlice.actions;
export default listingsSlice.reducer;
