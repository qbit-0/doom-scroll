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
>("comments/loadArticle", async ({ pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (searchStr === null) return thunkApi.rejectWithValue("search is null");

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
>("comments/loadMore", async ({ more, pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const replyTree = selectCommentsReplyTree(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (searchStr === null) return thunkApi.rejectWithValue("search is null");
    if (replyTree === null)
        return thunkApi.rejectWithValue("replyTree is null");

    const treeCopy = structuredClone(replyTree);
    const match = matchPath("/r/:subreddit/comments/:articleId/*", pathname);

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
>(
    "comments/continueThread",
    async ({ more, pathname, searchStr }, thunkApi) => {
        const accessToken = selectAccessToken(thunkApi.getState());

        if (accessToken === null)
            return thunkApi.rejectWithValue("accessToken is null");
        if (pathname === null)
            return thunkApi.rejectWithValue("pathname is null");
        if (searchStr === null)
            return thunkApi.rejectWithValue("search is null");

        const searchParams = new URLSearchParams(searchStr);
        searchParams.append("comment", more.data["name"]);
        searchParams.append("context", "1");

        let json;
        try {
            json = await RedditApi.fetchReddit(
                accessToken,
                pathname,
                searchStr
            );
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }

        console.log(json);

        return parseArticle(json);
    }
);

const initialState: {
    post: PostData | null;
    replyTree: ReplyTreeData;
    isRefreshing: boolean;
    isLoadingMore: boolean;
} = {
    post: null,
    replyTree: {
        data: {},
        currId: 0,
    },
    isRefreshing: false,
    isLoadingMore: false,
};

const commentsSlice = createSlice({
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

export const selectCommentsPost = (state: RootState) => state.comments.post;
export const selectCommentsReplyTree = (state: RootState) =>
    state.comments.replyTree;
export const selectCommentsIsRefreshing = (state: RootState) =>
    state.comments.isRefreshing;
export const selectCommentsIsLoadingMore = (state: RootState) =>
    state.comments.isLoadingMore;
export const selectCommentsIsLoading = createSelector(
    selectCommentsIsRefreshing,
    selectCommentsIsLoadingMore,
    (isRefreshing, isLoadingMore) => isRefreshing || isLoadingMore
);

export default commentsSlice.reducer;
