import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store";
import { selectAccessToken } from "features/auth/authSlice";
import RedditApi from "lib/reddit/redditApi";
import { Comment, More, Post, ReplyTree } from "lib/reddit/redditData";
import { parseArticle, pushMoreListing } from "lib/reddit/redditParseUtils";
import ReplyTreeUtils from "lib/reddit/replyTreeUtils";
import { NlpUtils } from "lib/utils/nlpUtils";
import { matchPath } from "react-router-dom";

export const loadArticle = createAsyncThunk<
    { post: Post; replyTree: ReplyTree },
    void,
    { state: RootState; dispatch: AppDispatch }
>("comments/loadArticle", async (args, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectCommentsPathname(thunkApi.getState());
    const search = selectCommentsSearch(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (search === null) return thunkApi.rejectWithValue("search is null");

    const json = await RedditApi.fetchReddit(accessToken, pathname, search);
    return parseArticle(json);
});

export const loadMore = createAsyncThunk<
    ReplyTree,
    More,
    { state: RootState; dispatch: AppDispatch }
>("comments/loadMore", async (more, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectCommentsPathname(thunkApi.getState());
    const search = selectCommentsSearch(thunkApi.getState());
    const replyTree = selectCommentsReplyTree(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (search === null) return thunkApi.rejectWithValue("search is null");
    if (replyTree === null)
        return thunkApi.rejectWithValue("replyTree is null");

    const treeCopy = structuredClone(replyTree);
    const match = matchPath("/r/:subreddit/comments/:articleId/*", pathname);

    if (match === null) return thunkApi.rejectWithValue("match is null");

    const articleId = "t3_" + match.params["articleId"];
    if (articleId === undefined)
        return thunkApi.rejectWithValue("articleId is undefined");

    const json = await RedditApi.fetchMoreJson(
        accessToken,
        more,
        articleId,
        search
    );

    if (more.id === undefined)
        return thunkApi.rejectWithValue("more is undefined");

    ReplyTreeUtils.remove(treeCopy, more.id);
    pushMoreListing(treeCopy, json, more);
    return treeCopy;
});

export const analyzeComment = createAsyncThunk(
    "comments/analyzeComment",
    async (comment: Comment, thunkApi) => {
        return NlpUtils.analyzeComment(comment);
    }
);

const initialState: {
    pathname: string | null;
    search: string | null;
    replyTree: ReplyTree;
    isRefreshing: boolean;
    isLoadingMore: boolean;
} = {
    pathname: null,
    search: null,
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
    reducers: {
        setComentsPathname: (state, action: PayloadAction<string>) => {
            state.pathname = action.payload;
        },
        setCommentsSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadArticle.pending, (state, action) => {
                state.isRefreshing = true;
                // TODO HANDLE ERRORS
            })
            .addCase(loadArticle.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.replyTree = action.payload.replyTree;
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

            .addCase(analyzeComment.pending, (state, action) => {
                // TODO HANDLE PENDING
                // TODO HANDLE ERRORS
            })
            .addCase(analyzeComment.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                const sentiment = action.payload;

                if (id === undefined) throw new Error("id is undefined");

                const comment: Comment = ReplyTreeUtils.find(
                    state.replyTree,
                    id
                ) as Comment;
                comment.meta.sentiment = sentiment;
            })
            .addCase(analyzeComment.rejected, (state, action) => {});
    },
});

export const selectCommentsPathname = (state: RootState) =>
    state.comments.pathname;
export const selectCommentsSearch = (state: RootState) => state.comments.search;
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
export const { setComentsPathname, setCommentsSearch } = commentsSlice.actions;
export default commentsSlice.reducer;
