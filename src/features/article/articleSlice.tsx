import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "App/store";
import { selectAccessToken } from "features/auth/authSlice";
import RedditApi from "lib/reddit/redditApi";
import { MoreData, PostData, ReplyTreeData } from "lib/reddit/redditData";
import { parseArticle, pushMoreListing } from "lib/reddit/redditParseUtils";
import ReplyTreeUtils from "lib/reddit/replyTreeUtils";
import { matchPath } from "react-router-dom";

export const loadArticle = createAsyncThunk<
    { post: PostData; replyTree: ReplyTreeData },
    { pathname: string; searchStr: string },
    { state: RootState; dispatch: AppDispatch }
>("article/loadArticle", async ({ pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const currPathname = selectArticlePathname(thunkApi.getState());
    const currSearchStr = selectArticleSearchStr(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");

    if (pathname === currPathname && searchStr === currSearchStr) {
        return thunkApi.rejectWithValue("already loaded");
    }

    let json;
    try {
        json = await RedditApi.fetchReddit(accessToken, pathname, searchStr);
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
    return parseArticle(json);
});

export const loadMore = createAsyncThunk<
    ReplyTreeData,
    { more: MoreData; pathname: string; searchStr: string },
    { state: RootState; dispatch: AppDispatch }
>("article/loadMore", async ({ more, pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const replyTree = selectCommentsReplyTree(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (searchStr === null) return thunkApi.rejectWithValue("search is null");
    if (replyTree === null)
        return thunkApi.rejectWithValue("replyTree is null");

    const treeCopy = structuredClone(replyTree);
    const match = matchPath(
        "/r/:subreddit/comments/:articleId/:articleTitle/*",
        pathname
    );

    if (match === null) return thunkApi.rejectWithValue("match is null");

    const articleId = "t3_" + match.params["articleId"];
    if (articleId === undefined)
        return thunkApi.rejectWithValue("articleId is undefined");

    let json;
    try {
        json = await RedditApi.fetchMoreJson(
            accessToken,
            more,
            articleId,
            searchStr
        );
    } catch (err) {
        thunkApi.rejectWithValue("failed to fetch");
    }

    if (more.id === undefined)
        return thunkApi.rejectWithValue("more is undefined");

    ReplyTreeUtils.remove(treeCopy, more.id);
    pushMoreListing(treeCopy, json, more);
    return treeCopy;
});

export const continueThread = createAsyncThunk<
    { post: PostData; replyTree: ReplyTreeData },
    { more: MoreData; pathname: string; searchStr: string },
    { state: RootState; dispatch: AppDispatch }
>("article/continueThread", async ({ more, pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const currPathname = selectArticlePathname(thunkApi.getState());
    const currSearchStr = selectArticleSearchStr(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");

    if (pathname === currPathname && searchStr === currSearchStr) {
        return thunkApi.rejectWithValue("already loaded");
    }

    const searchParams = new URLSearchParams(searchStr);
    searchParams.append("comment", more.data["name"]);
    searchParams.append("context", "1");

    let json;
    try {
        json = await RedditApi.fetchReddit(accessToken, pathname, searchStr);
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }

    console.log(json);

    return parseArticle(json);
});

const initialState: {
    pathname: string | null;
    searchStr: string | null;
    post: PostData | null;
    replyTree: ReplyTreeData;
    isRefreshing: boolean;
    isLoadingMore: boolean;
} = {
    pathname: null,
    searchStr: null,
    post: null,
    replyTree: {
        data: {},
        currId: 0,
    },
    isRefreshing: false,
    isLoadingMore: false,
};

const articleSlice = createSlice({
    name: "comments",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadArticle.pending, (state, action) => {
                state.isRefreshing = true;
                // TODO HANDLE ERRORS
            })
            .addCase(loadArticle.fulfilled, (state, action) => {
                state.post = action.payload.post;
                state.replyTree = action.payload.replyTree;
                state.pathname = action.meta.arg.pathname;
                state.searchStr = action.meta.arg.searchStr;
                state.isRefreshing = false;
            })
            .addCase(loadArticle.rejected, (state, action) => {
                state.isRefreshing = false;
            })

            .addCase(loadMore.pending, (state, action) => {
                state.isLoadingMore = true;
                // TODO HANDLE ERRORS
            })
            .addCase(loadMore.fulfilled, (state, action) => {
                state.replyTree = action.payload;
                state.isLoadingMore = false;
            })
            .addCase(loadMore.rejected, (state, action) => {
                state.isLoadingMore = false;
            })

            .addCase(continueThread.pending, (state, action) => {
                state.isRefreshing = true;
                // TODO HANDLE ERRORS
            })
            .addCase(continueThread.fulfilled, (state, action) => {
                state.post = action.payload.post;
                state.replyTree = action.payload.replyTree;
                state.isRefreshing = false;
            })
            .addCase(continueThread.rejected, (state, action) => {
                state.isRefreshing = false;
            });
    },
});

export const selectArticlePathname = (state: RootState) =>
    state.article.pathname;
export const selectArticleSearchStr = (state: RootState) =>
    state.article.searchStr;
export const selectCommentsPost = (state: RootState) => state.article.post;
export const selectCommentsReplyTree = (state: RootState) =>
    state.article.replyTree;
export const selectCommentsIsRefreshing = (state: RootState) =>
    state.article.isRefreshing;
export const selectCommentsIsLoadingMore = (state: RootState) =>
    state.article.isLoadingMore;
export const selectCommentsIsLoading = createSelector(
    selectCommentsIsRefreshing,
    selectCommentsIsLoadingMore,
    (isRefreshing, isLoadingMore) => isRefreshing || isLoadingMore
);

export default articleSlice.reducer;
