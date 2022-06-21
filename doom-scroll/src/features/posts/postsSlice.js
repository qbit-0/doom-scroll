import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyzePost } from "../../utility/nlpHelpers";
import { fetchReddit } from "../../utility/redditAPI";
import { selectAccessToken } from "../auth/authSlice";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (nlp, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const location = selectPostsLocation(thunkAPI.getState());
    const pathname = location.pathname;
    const search = location.search;

    if (!accessToken) {
      return {
        posts: [],
        before: null,
        after: null,
      };
    }

    const params = new URLSearchParams(search);

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: params.toString(),
    });

    const posts = responseJson.data.children;
    posts.forEach((post) => {
      post.score = analyzePost(nlp, post);
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

    if (!accessToken || !after) {
      return {
        posts: [],
        before: null,
        after: null,
      };
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
      post.score = analyzePost(nlp, post);
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
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.before = action.payload.before;
        state.after = action.payload.after;
        state.isLoading = false;
      })
      .addCase(loadPostsAfter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadPostsAfter.fulfilled, (state, action) => {
        state.posts.push(...action.payload.posts);
        state.after = action.payload.after;
        state.isLoading = false;
      });
  },
});

export const selectPostsLocation = (state) => state.posts.location;
export const selectPosts = (state) => state.posts.posts;
export const selectPostsBefore = (state) => state.posts.before;
export const selectPostsAfter = (state) => state.posts.after;
export const selectIsLoadingPosts = (state) => state.posts.isLoading;

export const { setPostsLocation } = postSlice.actions;
export default postSlice.reducer;
