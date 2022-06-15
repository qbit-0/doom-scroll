import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Slice

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (subreddit, thunkAPI) => {
    const response = await fetch(`http://www.reddit.com/r/${subreddit}/.json`);
    const json = await response.json();
    return json;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data.children;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

// Selectors

export const selectPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectHasError = (state) => state.posts.hasError;

// Exports

export const { } = postsSlice.actions;
export default postsSlice.reducer;