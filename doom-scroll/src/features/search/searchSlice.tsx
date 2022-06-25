import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WinkMethods } from "wink-nlp";
import { AppDispatch, RootState } from "../../app/store";
import { fetchSearchPosts } from "../../reddit/redditApi";
import { Post } from "../../reddit/redditDataStructures";
import { selectAccessToken } from "../auth/authSlice";

export const loadSearchPosts = createAsyncThunk<
  Post[],
  WinkMethods,
  { state: RootState; dispatch: AppDispatch }
>("search/loadSearchPosts", async (nlp, thunkApi) => {
  const search = selectSearch(thunkApi.getState());
  const accessToken = selectAccessToken(thunkApi.getState());

  if (search === null) {
    return thunkApi.rejectWithValue("Search parameters are null.");
  }

  if (accessToken === null) {
    return thunkApi.rejectWithValue("Access token is null.");
  }

  const params = new URLSearchParams(search);

  const posts: Post[] = await fetchSearchPosts(accessToken, params.toString());
  return posts;
});

export const loadSearchPostsAfter = createAsyncThunk<
  Post[],
  WinkMethods,
  { state: RootState; dispatch: AppDispatch }
>("search/loadSearchPostsAfter", async (nlp, thunkApi) => {
  const search = selectSearch(thunkApi.getState());
  const accessToken = selectAccessToken(thunkApi.getState());
  const after = selectAfter(thunkApi.getState());

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

  const posts = await fetchSearchPosts(accessToken, params.toString());
  return posts;
});

const initialState: {
  search: string | null;
  posts: Post[];
  before: string | null;
  after: string | null;
  isLoadingNew: boolean;
  isLoadingAfter: boolean;
  isLoading: boolean;
} = {
  search: null,
  posts: [],
  before: null,
  after: null,
  isLoadingNew: false,
  isLoadingAfter: false,
  isLoading: false,
};

export const searchSlice = createSlice({
  name: "seach",
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchPosts.pending, (state, action) => {
        state.isLoadingNew = true;
        state.isLoading = true;
      })
      .addCase(loadSearchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.after = action.payload[action.payload.length - 1].data.name;
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingAfter;
      })
      .addCase(loadSearchPosts.rejected, (state, action) => {
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingAfter;
      })
      .addCase(loadSearchPostsAfter.pending, (state, action) => {
        state.isLoadingAfter = true;
        state.isLoading = true;
      })
      .addCase(loadSearchPostsAfter.fulfilled, (state, action) => {
        state.posts.push(...action.payload);
        state.after = action.payload[action.payload.length - 1].data.name;
        state.isLoadingAfter = false;
        state.isLoading = state.isLoadingNew;
      })
      .addCase(loadSearchPostsAfter.rejected, (state, action) => {
        state.isLoadingAfter = false;
        state.isLoading = state.isLoadingNew;
      });
  },
});

export const selectSearch = (state: RootState) => state.search.search;
export const selectPosts = (state: RootState) => state.search.posts;
export const selectBefore = (state: RootState) => state.search.before;
export const selectAfter = (state: RootState) => state.search.after;
export const selectIsLoadingNew = (state: RootState) =>
  state.search.isLoadingNew;
export const selectIsLoadingAfter = (state: RootState) =>
  state.search.isLoadingAfter;
export const selectIsLoading = (state: RootState) => state.search.isLoading;

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
