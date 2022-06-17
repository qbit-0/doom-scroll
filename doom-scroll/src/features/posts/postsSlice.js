import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReddit } from "../../utility/redditAPI";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ accessToken, pathname, search }, thunkAPI) => {
    return await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: search,
    });
  }
);

export const appendPosts = createAsyncThunk(
  "posts/appendPosts",
  async ({ accessToken, pathname, search }, thunkAPI) => {
    const params = new URLSearchParams(search);
    params.append("after", selectPostsAfter(thunkAPI.getState()));

    return await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: params.toString(),
    });
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    children: [],
    before: null,
    after: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.children = action.payload.data.children;
        state.before = action.payload.data.before;
        state.after = action.payload.data.after;
      })
      .addCase(appendPosts.fulfilled, (state, action) => {
        state.children.push(...action.payload.data.children);
        state.before = action.payload.data.before;
        state.after = action.payload.data.after;
      });
  },
});

export const selectPostsChildren = (state) => state.posts.children;
export const selectPostsBefore = (state) => state.posts.before;
export const selectPostsAfter = (state) => state.posts.after;

export default postSlice.reducer;
