import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { WinkMethods } from "wink-nlp";
import { AppDispatch, RootState } from "../../app/store";
import { fetchSubredditPosts } from "../../reddit/redditApi";
import { Post } from "../../reddit/redditDataStructures";
import { selectAccessToken } from "../auth/authSlice";

export const loadSubredditPosts = createAsyncThunk<
  Post[],
  WinkMethods,
  { state: RootState; dispatch: AppDispatch }
>("subreddit/loadSubredditPosts", async (nlp, thunkApi) => {
  const subreddit = selectSubreddit(thunkApi.getState());
  const search = selectSearch(thunkApi.getState());
  const accessToken = selectAccessToken(thunkApi.getState());

  if (subreddit === null) {
    return thunkApi.rejectWithValue("Subreddit is null.");
  }

  if (search === null) {
    return thunkApi.rejectWithValue("Search parameters are null.");
  }

  if (accessToken === null) {
    return thunkApi.rejectWithValue("Access token is null.");
  }

  const params = new URLSearchParams(search);

  const posts = await fetchSubredditPosts(
    accessToken,
    subreddit,
    params.toString()
  );

  return posts;
});

export const loadSubredditPostsAfter = createAsyncThunk<
  Post[],
  WinkMethods,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("subreddit/loadSubredditPostsAfter", async (nlp, thunkApi) => {
  const subreddit = selectSubreddit(thunkApi.getState());
  const search = selectSearch(thunkApi.getState());
  const accessToken = selectAccessToken(thunkApi.getState());
  const after = selectAfter(thunkApi.getState());

  if (subreddit === null) {
    return thunkApi.rejectWithValue("Subreddit is null.");
  }

  if (search === null) {
    return thunkApi.rejectWithValue("Search parameters are null.");
  }

  if (accessToken === null) {
    return thunkApi.rejectWithValue("Access token is null.");
  }

  if (after === null) {
    return thunkApi.rejectWithValue("After is null.");
  }

  const params = new URLSearchParams(search);
  params.append("after", after);

  const posts = await fetchSubredditPosts(
    accessToken,
    subreddit,
    params.toString()
  );

  return posts;
});

const initialState: {
  subreddit: string | null;
  search: string | null;
  posts: Post[];
  before: string | null;
  after: string | null;
  isLoadingNew: boolean;
  isLoadingAfter: boolean;
  isLoading: boolean;
} = {
  subreddit: null,
  search: null,
  posts: [],
  before: null,
  after: null,
  isLoadingNew: false,
  isLoadingAfter: false,
  isLoading: false,
};

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: initialState,
  reducers: {
    setSubreddit: (state, action: PayloadAction<string>) => {
      state.subreddit = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubredditPosts.pending, (state, action) => {
        state.isLoadingNew = true;
        state.isLoading = true;
      })
      .addCase(loadSubredditPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.after = action.payload[action.payload.length - 1].data.name;
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingAfter;
      })
      .addCase(loadSubredditPosts.rejected, (state, action) => {
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingAfter;
      })
      .addCase(loadSubredditPostsAfter.pending, (state, action) => {
        state.isLoadingAfter = true;
        state.isLoading = true;
      })
      .addCase(loadSubredditPostsAfter.fulfilled, (state, action) => {
        state.posts.push(...action.payload);
        state.after = action.payload[action.payload.length - 1].data.name;
        state.isLoadingAfter = false;
        state.isLoading = state.isLoadingNew;
      })
      .addCase(loadSubredditPostsAfter.rejected, (state, action) => {
        state.isLoadingAfter = false;
        state.isLoading = state.isLoadingNew;
      });
  },
});

export const selectSubreddit = (state: RootState) => state.subreddit.subreddit;
export const selectSearch = (state: RootState) => state.subreddit.search;
export const selectPosts = (state: RootState) => state.subreddit.posts;
export const selectBefore = (state: RootState) => state.subreddit.before;
export const selectAfter = (state: RootState) => state.subreddit.after;
export const selectIsLoadingNew = (state: RootState) =>
  state.subreddit.isLoadingNew;
export const selectIsLoadingAfter = (state: RootState) =>
  state.subreddit.isLoadingAfter;
export const selectIsLoading = (state: RootState) => state.subreddit.isLoading;

export const { setSubreddit, setSearch } = subredditSlice.actions;
export default subredditSlice.reducer;
