import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReddit } from "../../utility/redditAPI";
import { selectAccessToken } from "../auth/authSlice";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (args, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const pathname = selectPostsPathname(thunkAPI.getState());
    const search = selectPostsSearch(thunkAPI.getState());

    if (!accessToken) {
      return {
        posts: [],
        before: null,
        after: null,
      };
    }

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: search,
    });

    return {
      posts: responseJson.data.children,
      after: responseJson.data.after,
    };
  }
);

export const loadPostsAfter = createAsyncThunk(
  "posts/loadPostsAfter",
  async (args, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const pathname = selectPostsPathname(thunkAPI.getState());
    const search = selectPostsSearch(thunkAPI.getState());
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

    return {
      posts: responseJson.data.children,
      before: responseJson.data.before,
      after: responseJson.data.after,
    };
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    pathname: "",
    search: "",
    posts: [],
    before: null,
    after: null,
  },
  reducers: {
    setPostsPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setPostsSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.before = action.payload.before;
        state.after = action.payload.after;
      })
      .addCase(loadPostsAfter.fulfilled, (state, action) => {
        state.posts.push(...action.payload.posts);
        state.after = action.payload.after;
      });
  },
});

export const selectPostsPathname = (state) => state.posts.pathname;
export const selectPostsSearch = (state) => state.posts.search;
export const selectPosts = (state) => state.posts.posts;
export const selectPostsBefore = (state) => state.posts.before;
export const selectPostsAfter = (state) => state.posts.after;

export const { setPostsPathname, setPostsSearch } = postSlice.actions;
export default postSlice.reducer;
