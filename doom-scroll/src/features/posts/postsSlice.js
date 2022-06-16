import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://oauth.reddit.com";

// Slice

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async ({ accessToken, subreddit }) => {
    const url = new URL(`${BASE_URL}/r/${subreddit}/`);

    const headers = {
      Authorization: `bearer ${accessToken}`,
    };

    const response = await fetch(url.href, {
      method: "GET",
      headers: headers,
    });

    const json = await response.json();
    return json;
  }
);

export const loadMorePosts = createAsyncThunk(
  "posts/loadMorePosts",
  async ({ accessToken, subreddit }, thunkAPI) => {
    const url = new URL(`${BASE_URL}/r/${subreddit}/`);
    const params = new URLSearchParams();
    const after = selectAfter(thunkAPI.getState());
    if (after !== null) {
      params.append("after", after);
    }

    const headers = {
      Authorization: `bearer ${accessToken}`,
    };

    const response = await fetch(`${url.href}?${params.toString()}`, {
      method: "GET",
      headers: headers,
    });

    const json = await response.json();
    return json;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    before: null,
    after: null,
    count: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data.children;
        state.before = action.payload.data.before;
        state.after = action.payload.data.after;
        state.count = action.payload.data.children.length;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
      })

      .addCase(loadMorePosts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadMorePosts.fulfilled, (state, action) => {
        state.posts.push(...action.payload.data.children);
        state.before = action.payload.data.before;
        state.after = action.payload.data.after;
        state.count = action.payload.data.children.length;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadMorePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

// Selectors

export const selectPosts = (state) => state.posts.posts;
export const selectBefore = (state) => state.posts.before;
export const selectAfter = (state) => state.posts.after;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectHasError = (state) => state.posts.hasError;

// Exports

export const {} = postsSlice.actions;
export default postsSlice.reducer;
