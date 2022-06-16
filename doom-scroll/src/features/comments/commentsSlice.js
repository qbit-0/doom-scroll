import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://oauth.reddit.com";

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async ({ accessToken, subreddit, article }, thunkAPI) => {
    
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  reducers: {},
  extraReducers: {},
});
