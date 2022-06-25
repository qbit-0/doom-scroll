import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WinkMethods } from "wink-nlp";
import { AppDispatch, RootState } from "../../app/store";
import { fetchArticle, fetchMore } from "../../reddit/redditApi";
import { Article, Reply } from "../../reddit/redditDataStructures";
import { getReplyByPath } from "../../reddit/redditDataStructuresUtils";
import { selectAccessToken } from "../auth/authSlice";

export const loadArticle = createAsyncThunk<
  Article,
  WinkMethods,
  { state: RootState; dispatch: AppDispatch }
>("comments/loadArticle", async (nlp, thunkApi) => {
  const subreddit = selectSubreddit(thunkApi.getState());
  const articleId = selectArticleId(thunkApi.getState());
  const search = selectSearch(thunkApi.getState());
  const accessToken = selectAccessToken(thunkApi.getState());

  if (subreddit === null) {
    return thunkApi.rejectWithValue("Subreddit is null.");
  }

  if (articleId === null) {
    return thunkApi.rejectWithValue("ArticleId is null.");
  }

  if (search === null) {
    return thunkApi.rejectWithValue("Search parameters are null.");
  }

  if (accessToken === null) {
    return thunkApi.rejectWithValue("Access token is null.");
  }

  const article = await fetchArticle(accessToken, subreddit, articleId, search);
  return article;
});

export const loadMore = createAsyncThunk<
  Reply[],
  { replacePath: number[]; nlp: WinkMethods },
  { state: RootState; dispatch: AppDispatch }
>("comments/loadMore", async ({ replacePath, nlp }, thunkApi) => {
  const subreddit = selectSubreddit(thunkApi.getState());
  const articleId = selectArticleId(thunkApi.getState());
  const search = selectSearch(thunkApi.getState());
  const accessToken = selectAccessToken(thunkApi.getState());
  const article = selectArticle(thunkApi.getState());

  if (subreddit === null) {
    return thunkApi.rejectWithValue("Subreddit is null.");
  }

  if (articleId === null) {
    return thunkApi.rejectWithValue("ArticleId is null.");
  }

  if (search === null) {
    return thunkApi.rejectWithValue("Search parameters are null.");
  }

  if (accessToken === null) {
    return thunkApi.rejectWithValue("Access token is null.");
  }

  if (article === null) {
    return thunkApi.rejectWithValue("Article is null.");
  }

  const more = getReplyByPath(article.data.replyRoot, replacePath);
  if (!("replyIds" in more)) {
    return thunkApi.rejectWithValue(
      "ReplyPath does not lead to Reply of type More."
    );
  }

  return await fetchMore(accessToken, articleId, search, more);
});

const initialState: {
  subreddit: string | null;
  articleId: string | null;
  search: string | null;
  article: Article | null;
  isLoadingNew: boolean;
  isLoadingReplacement: boolean;
  isLoading: boolean;
} = {
  subreddit: null,
  articleId: null,
  search: null,
  article: null,
  isLoadingNew: false,
  isLoadingReplacement: false,
  isLoading: false,
};

export const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    setSubreddit: (state, action: PayloadAction<string>) => {
      state.subreddit = action.payload;
    },
    setArticleId: (state, action: PayloadAction<string>) => {
      state.articleId = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticle.pending, (state, action) => {
        state.isLoadingNew = true;
        state.isLoading = true;
      })
      .addCase(loadArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.isLoadingNew = false;
      })
      .addCase(loadArticle.rejected, (state, action) => {
        state.isLoadingNew = false;
        state.isLoading = state.isLoadingReplacement;
      })
      .addCase(loadMore.pending, (state, action) => {
        state.isLoadingReplacement = true;
        state.isLoading = true;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        const replies = action.payload;
        const replyPath = action.meta.arg.replacePath;
        // TODO

        state.isLoadingReplacement = false;
        state.isLoading = state.isLoadingNew;
      })
      .addCase(loadMore.rejected, (state, action) => {
        state.isLoadingReplacement = false;
        state.isLoading = state.isLoadingNew;
      });
  },
});

export const selectSubreddit = (state: RootState) => state.article.subreddit;
export const selectArticleId = (state: RootState) => state.article.articleId;
export const selectSearch = (state: RootState) => state.article.search;
export const selectArticle = (state: RootState) => state.article.article;
export const selectIsLoadingNew = (state: RootState) =>
  state.article.isLoadingNew;
export const selectIsLoadingReplacement = (state: RootState) =>
  state.article.isLoadingReplacement;
export const selectIsLoading = (state: RootState) => state.article.isLoading;

export const { setSubreddit, setArticleId, setSearch } = articleSlice.actions;
export default articleSlice.reducer;
