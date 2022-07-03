import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "App/store";
import { selectAccessToken } from "features/auth/authSlice";
import PostDequeUtils from "lib/reddit/postDequeUtils";
import RedditApi from "lib/reddit/redditApi";
import { PostData, PostDequeData } from "lib/reddit/redditData";
import {
    parseArticle,
    parsePostDeque,
    parsePostListing,
} from "lib/reddit/redditParseUtils";
import { NlpUtils } from "lib/utils/nlpUtils";

export const loadPosts = createAsyncThunk<
    PostDequeData,
    { pathname: string; searchStr: string },
    { state: RootState; dispatch: AppDispatch }
>("browse/loadPosts", async ({ pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const currPathname = selectBrowsePathname(thunkApi.getState());
    const currSearchStr = selectBrowseSearchStr(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");

    if (pathname === currPathname && searchStr === currSearchStr) {
        return thunkApi.rejectWithValue("already loaded");
    }

    const searchParams = new URLSearchParams(searchStr);
    searchParams.append("limit", "5");

    let json;
    try {
        json = await RedditApi.fetchReddit(
            accessToken,
            pathname,
            searchParams.toString()
        );
    } catch (err) {
        thunkApi.rejectWithValue(err);
    }
    return parsePostDeque(json);
});

export const loadPostsAfter = createAsyncThunk<
    PostData[],
    { pathname: string; searchStr: string },
    { state: RootState; dispatch: AppDispatch }
>("browse/loadPostsAfter", async ({ pathname, searchStr }, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const after = selectPostsAfter(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (searchStr === null) return thunkApi.rejectWithValue("search is null");
    if (after === null) return thunkApi.rejectWithValue("after is null");

    const searchParams = new URLSearchParams(searchStr);
    searchParams.append("limit", "5");
    searchParams.append("after", after);

    let json;
    try {
        json = await RedditApi.fetchReddit(
            accessToken,
            pathname,
            searchParams.toString()
        );
    } catch (err) {
        thunkApi.rejectWithValue(err);
    }
    return parsePostListing(json);
});

export const analyzePostComments = createAsyncThunk<
    number,
    PostData,
    { state: RootState; dispatch: AppDispatch }
>("browse/analyzePostAndReplies", async (post: PostData, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");

    let json;
    try {
        json = await RedditApi.fetchReddit(
            accessToken,
            post.data["permalink"],
            ""
        );
    } catch (err) {
        thunkApi.rejectWithValue(err);
    }

    const { replyTree } = parseArticle(json);

    return NlpUtils.analyzePostComments(replyTree);
});

const initialState: {
    pathname: string | null;
    searchStr: string | null;
    postDeque: PostDequeData;
    isRefreshing: boolean;
    isLoadingBefore: boolean;
    isLoadingAfter: boolean;
} = {
    pathname: null,
    searchStr: null,
    postDeque: {
        data: {},
        topId: 0,
        botId: 0,
        before: null,
        after: null,
    },
    isRefreshing: false,
    isLoadingBefore: false,
    isLoadingAfter: false,
};

const browseSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state, action) => {
                state.isRefreshing = true;
                // TODO HANDLE ERRORS
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.postDeque = action.payload;
                state.pathname = action.meta.arg.pathname;
                state.searchStr = action.meta.arg.searchStr;
                state.isRefreshing = false;
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.isRefreshing = false;
            })

            .addCase(loadPostsAfter.pending, (state, action) => {
                state.isLoadingAfter = true;
                // TODO HANDLE ERRORS
            })
            .addCase(loadPostsAfter.fulfilled, (state, action) => {
                action.payload.forEach((post) => {
                    PostDequeUtils.pushBot(state.postDeque, post);
                });
                state.isLoadingAfter = false;
            })
            .addCase(loadPostsAfter.rejected, (state, action) => {
                state.isLoadingAfter = false;
            })

            .addCase(analyzePostComments.pending, (state, action) => {
                // TODO HANDLE PENDING AND ERRORS
            })
            .addCase(analyzePostComments.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                const fullSentiment = action.payload;

                if (id === undefined) throw new Error("id is undefined");

                const post = PostDequeUtils.find(state.postDeque, id);
                if (post === undefined) throw new Error("post is undefined");

                post.meta.commentsSentiment = fullSentiment;
            })
            .addCase(analyzePostComments.rejected, (state, action) => {});
    },
});

export const selectBrowsePathname = (state: RootState) => state.browse.pathname;
export const selectBrowseSearchStr = (state: RootState) =>
    state.browse.searchStr;
export const selectPostDeque = (state: RootState) => state.browse.postDeque;
export const selectPostsBefore = (state: RootState) =>
    state.browse.postDeque.before;
export const selectPostsAfter = (state: RootState) =>
    state.browse.postDeque.after;
export const selectPostsIsRefreshing = (state: RootState) =>
    state.browse.isRefreshing;
export const selectPostsIsLoadingBefore = (state: RootState) =>
    state.browse.isLoadingBefore;
export const selectPostsIsLoadingAfter = (state: RootState) =>
    state.browse.isLoadingAfter;
export const selectPostsIsLoading = createSelector(
    selectPostsIsRefreshing,
    selectPostsIsLoadingBefore,
    selectPostsIsLoadingAfter,
    (isRefreshing, isLoadingBefore, isLoadingAfter) =>
        isRefreshing || isLoadingBefore || isLoadingAfter
);

export default browseSlice.reducer;
