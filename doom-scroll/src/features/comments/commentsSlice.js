import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReddit } from "../../utility/redditAPI";
import { flattenCommentTree } from "../../utility/redditDataStructure";
import { selectAccessToken } from "../auth/authSlice";

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (args, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const pathname = selectCommentsPathname(thunkAPI.getState());
    const search = selectCommentsSearch(thunkAPI.getState());

    if (!accessToken) {
      return {
        post: null,
        comments: [],
      };
    }

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: search,
    });

    const post = responseJson[0].data.children[0];
    const comments = flattenCommentTree(responseJson[1]);

    return {
      post: post,
      comments: comments,
    };
  }
);

export const replaceComment = createAsyncThunk(
  "comments/replaceComment",
  async ({ index, childrenIds }, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const post = selectCommentsPost(thunkAPI.getState());
    const link = post.data.name;

    if (!accessToken) {
      return {
        index: index,
        newComments: [],
      };
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

    return {
      index: index,
      newComments: responseJson.json.data.things,
    };
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    pathname: "",
    search: "",
    post: null,
    comments: [],
  },
  reducers: {
    setCommentsPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setCommentsSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(replaceComment.fulfilled, (state, action) => {
        const { index, newComments } = action.payload;

        state.comments = [
          ...state.comments.slice(0, index),
          ...newComments,
          ...state.comments.slice(index + 1, state.comments.length),
        ];
      });
  },
});

export const selectCommentsPathname = (state) => state.comments.pathname;
export const selectCommentsSearch = (state) => state.comments.search;
export const selectCommentsPost = (state) => state.comments.post;
export const selectComments = (state) => state.comments.comments;

export const { setCommentsPathname, setCommentsSearch } = commentsSlice.actions;
export default commentsSlice.reducer;
