import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReddit } from "../../utility/redditAPI";

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async ({ accessToken, pathname, search }) => {
    const params = new URLSearchParams(search);
    params.append("depth", "10");

    return await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: params.toString(),
    });
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    post: null,
    children: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.post = action.payload[0].data.children[0];
      state.children = action.payload[1].data.children;
    });
  },
});

export const selectCommentPost = (state) => state.comments.post;
export const selectCommentsChildren = (state) => state.comments.children;

export default commentsSlice.reducer;
