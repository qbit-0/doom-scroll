import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyzePost } from "../../utils/nlpHelpers";
import { fetchReddit } from "../../utils/redditAPI";
import { selectAccessToken } from "../auth/authSlice";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (nlp, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const location = selectPostsLocation(thunkAPI.getState());
    const pathname = location.pathname;
    const search = location.search;

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token found.");
    }

    const params = new URLSearchParams(search);

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: params.toString(),
    });

    const posts = responseJson.data.children;
    posts.forEach((post) => {
      post.sentiment = analyzePost(nlp, post);
    });

    return {
      posts: posts,
      after: responseJson.data.after,
    };
  }
);

export const loadPostsAfter = createAsyncThunk(
  "posts/loadPostsAfter",
  async (nlp, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const location = selectPostsLocation(thunkAPI.getState());
    const pathname = location.pathname;
    const search = location.search;
    const after = selectPostsAfter(thunkAPI.getState());

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token found.");
    }

    if (!after) {
      return thunkAPI.rejectWithValue("No listings after current.");
    }

    const params = new URLSearchParams(search);
    params.append("after", after);

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: params.toString(),
    });

    const posts = responseJson.data.children;
    posts.forEach((post) => {
      post.sentiment = analyzePost(nlp, post);
    });

    return {
      posts: posts,
      before: responseJson.data.before,
      after: responseJson.data.after,
    };
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    location: {
      pathname: "",
      search: "",
    },
    posts: [],
    before: null,
    after: null,
    isLoadingNew: false,
    isLoadingAfter: false,
    isLoading: false,
  },
  reducers: {
    setPostsLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state, action) => {
        state.isLoadingNew = true;
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.before = action.payload.before;
        state.after = action.payload.after;
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingAfter;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingAfter;
      })
      .addCase(loadPostsAfter.pending, (state, action) => {
        state.isLoadingAfter = true;
        state.isLoading = true;
      })
      .addCase(loadPostsAfter.fulfilled, (state, action) => {
        state.posts.push(...action.payload.posts);
        state.after = action.payload.after;
        state.isLoadingAfter = false;
        state.isLoading = state.isLoadingNew;
      })
      .addCase(loadPostsAfter.rejected, (state, action) => {
        state.isLoadingAfter = false;
        state.isLoading = state.isLoadingNew;
      });
  },
});

export const selectPostsLocation = (state) => state.posts.location;
export const selectPosts = (state) => state.posts.posts;
export const selectPostsBefore = (state) => state.posts.before;
export const selectPostsAfter = (state) => state.posts.after;
export const selectIsLoadingPostsNew = (state) => state.posts.isLoadingNew;
export const selectIsLoadingPostsAfter = (state) => state.posts.isLoadingAfter;
export const selectIsLoadingPosts = (state) => state.posts.isLoading;

export const { setPostsLocation } = postSlice.actions;
export default postSlice.reducer;
