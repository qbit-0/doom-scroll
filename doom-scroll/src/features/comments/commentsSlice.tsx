import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { matchPath } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import {
    fetchMoreJson as fetchMore,
    fetchReddit,
} from "../../reddit/redditApi";
import { Post, ReplyTree } from "../../reddit/redditData";
import { replyTreeFind } from "../../reddit/redditDataUtils";
import {
    parseArticle,
    parseMoreListing as pushMoreListing,
} from "../../reddit/redditParseUtils";
import { selectAccessToken } from "../auth/authSlice";

export const loadArticle = createAsyncThunk<
    { post: Post; replyTree: ReplyTree },
    undefined,
    { state: RootState; dispatch: AppDispatch }
>("comments/loadArticle", async (args, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectCommentsPathname(thunkApi.getState());
    const search = selectCommentsSearch(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (search === null) return thunkApi.rejectWithValue("search is null");

    const json = await fetchReddit(accessToken, pathname, search);
    return parseArticle(json);
});

export const loadMore = createAsyncThunk<
    ReplyTree,
    number,
    { state: RootState; dispatch: AppDispatch }
>("comments/loadMore", async (id, thunkApi) => {
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

    const more = replyTreeFind(replyTree, id);
    if ("children" in more)
        return thunkApi.rejectWithValue("more is a Comment");

    const match = matchPath(
        pathname,
        "/r/:subreddit/comments/:articleId/:articleTitle"
    );

    if (match === null) return thunkApi.rejectWithValue("match is null");

    const articleId = match.params["articleId"];

    if (articleId === undefined)
        return thunkApi.rejectWithValue("articleId is undefined");

    const json = await fetchMore(
        accessToken,
        more.data.childrenIds,
        articleId,
        search
    );
    pushMoreListing(treeCopy, json, more.parent);

    return treeCopy;
});

const initialState: {
    pathname: string | null;
    search: string | null;
    post: Post | null;
    replyTree: ReplyTree | null;
    isRefreshing: boolean;
    isLoadingMore: boolean;
} = {
    pathname: null,
    search: null,
    post: null,
    replyTree: null,
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
            })
            .addCase(loadArticle.fulfilled, (state, action) => {
                state.isRefreshing = false;
            })
            .addCase(loadArticle.rejected, (state, action) => {
                state.isRefreshing = false;
            })

            .addCase(loadMore.pending, (state, action) => {
                state.isLoadingMore = true;
            })
            .addCase(loadMore.fulfilled, (state, action) => {
                state.isLoadingMore = false;
            })
            .addCase(loadMore.rejected, (state, action) => {
                state.isLoadingMore = false;
            });
    },
});

export const selectCommentsPathname = (state: RootState) =>
    state.comments.pathname;
export const selectCommentsSearch = (state: RootState) => state.comments.search;
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
export const { setComentsPathname, setCommentsSearch } = commentsSlice.actions;
export default commentsSlice.reducer;
