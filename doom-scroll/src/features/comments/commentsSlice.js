import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyzeComment, analyzePost } from "../../utils/nlpHelpers";
import { fetchReddit } from "../../utils/redditAPI";
import { flattenCommentTree } from "../../utils/redditDataStructure";
import { selectAccessToken } from "../auth/authSlice";

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (nlp, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const location = selectCommentsLocation(thunkAPI.getState());
    const pathname = location.pathname;
    const search = location.search;

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token found.");
    }

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: search,
    });

    const post = responseJson[0].data.children[0];
    post.score = analyzePost(nlp, post);

    const comments = flattenCommentTree(responseJson[1]);
    comments.forEach((comment) => {
      comment.sentiment = analyzeComment(nlp, comment);
    });

    return {
      post: post,
      comments: comments,
    };
  }
);

export const replaceComment = createAsyncThunk(
  "comments/replaceComment",
  async ({ index, childrenIds, nlp }, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const post = selectCommentsPost(thunkAPI.getState());
    const link = post.data.name;

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token found.");
    }

    const params = new URLSearchParams();
    params.append("api_type", "json");
    params.append("children", childrenIds.join(","));
    params.append("link_id", link);

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: "/api/morechildren",
      search: params.toString(),
    });

    const comments = responseJson.json.data.things;
    comments.forEach((comment) => {
      comment.sentiment = analyzeComment(nlp, comment);
    });

    return {
      index: index,
      newComments: comments,
    };
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    location: {
      pathname: "",
      search: "",
    },
    post: null,
    comments: [],
    isLoadingNew: false,
    isLoadingReplacement: false,
    isLoading: false,
  },
  reducers: {
    setCommentsLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state, action) => {
        state.isLoadingNew = true;
        state.isLoading = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.comments = action.payload.comments;
        state.isLoadingNew = false;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingReplacement;
      })
      .addCase(replaceComment.pending, (state, action) => {
        state.isLoadingReplacement = true;
        state.isLoading = true;
      })
      .addCase(replaceComment.fulfilled, (state, action) => {
        const { index, newComments } = action.payload;

        state.comments = [
          ...state.comments.slice(0, index),
          ...newComments,
          ...state.comments.slice(index + 1, state.comments.length),
        ];

        state.isLoadingReplacement = false;
        state.isLoading = state.isLoadingNew;
      })
      .addCase(replaceComment.rejected, (state, action) => {
        state.isLoadingReplacement = false;
        state.isLoading = state.isLoadingNew;
      });
  },
});

export const selectCommentsLocation = (state) => state.comments.location;
export const selectCommentsPost = (state) => state.comments.post;
export const selectComments = (state) => state.comments.comments;
export const selectCommentsIsLoadingNew = (state) =>
  state.comments.isLoadingNew;
export const selectCommentsIsLoadingReplacement = (state) =>
  state.comments.isLoadingReplacement;
export const selectIsLoadingComments = (state) => state.comments.isLoading;

export const { setCommentsLocation } = commentsSlice.actions;
export default commentsSlice.reducer;
