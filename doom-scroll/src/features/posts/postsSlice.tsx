import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store";
import { selectAccessToken } from "features/auth/authSlice";
import { loadArticle } from "features/comments/commentsSlice";
import {
    default as PostDequeUtils,
    default as postDequeUtils,
} from "lib/reddit/postDequeUtils";
import RedditApi from "lib/reddit/redditApi";
import { PostData, PostDeque } from "lib/reddit/redditData";
import {
    parseArticle,
    parsePostDeque,
    parsePostListing,
} from "lib/reddit/redditParseUtils";
import { NlpUtils } from "lib/utils/nlpUtils";

export const loadPosts = createAsyncThunk<
    PostDeque,
    void,
    { state: RootState; dispatch: AppDispatch }
>("posts/loadPosts", async (args, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectPostsPathname(thunkApi.getState());
    const searchStr = selectPostsSearchStr(thunkApi.getState());

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
    return parsePostDeque(json);
});

export const loadPostsAfter = createAsyncThunk<
    PostData[],
    void,
    { state: RootState; dispatch: AppDispatch }
>("posts/loadPostsAfter", async (args, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectPostsPathname(thunkApi.getState());
    const search = selectPostsSearchStr(thunkApi.getState());
    const after = selectPostsAfter(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (search === null) return thunkApi.rejectWithValue("search is null");
    if (after === null) return thunkApi.rejectWithValue("after is null");

    const searchParams = new URLSearchParams(search);
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
>("posts/analyzePostAndReplies", async (post: PostData, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");

    const json = await RedditApi.fetchReddit(
        accessToken,
        post.data["permalink"],
        ""
    );
    const { replyTree } = parseArticle(json);

    return NlpUtils.analyzePostComments(replyTree);
});

const initialState: {
    pathname: string | null;
    searchStr: string | null;
    postDeque: PostDeque;
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

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        setPostsPathname: (state, action: PayloadAction<string>) => {
            state.pathname = action.payload;
        },
        setPostsSearchStr: (state, action: PayloadAction<string>) => {
            state.searchStr = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state, action) => {
                state.isRefreshing = true;
                // TODO HANDLE ERRORS
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.postDeque = action.payload;
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

                const post = postDequeUtils.find(state.postDeque, id);
                if (post === undefined) throw new Error("post is undefined");

                post.meta.commentsSentiment = fullSentiment;
            })
            .addCase(analyzePostComments.rejected, (state, action) => {})

            .addCase(loadArticle.pending, (state, action) => {
                state.isRefreshing = true;
            })
            .addCase(loadArticle.fulfilled, (state, action) => {
                const post = action.payload.post;
                PostDequeUtils.clear(state.postDeque);
                PostDequeUtils.pushBot(state.postDeque, post);
                state.isRefreshing = false;
            })
            .addCase(loadArticle.rejected, (state, action) => {
                state.isRefreshing = false;
            });
    },
});

export const selectPostsPathname = (state: RootState) => state.posts.pathname;
export const selectPostsSearchStr = (state: RootState) => state.posts.searchStr;
export const selectPostDeque = (state: RootState) => state.posts.postDeque;
export const selectPostsBefore = (state: RootState) =>
    state.posts.postDeque.before;
export const selectPostsAfter = (state: RootState) =>
    state.posts.postDeque.after;
export const selectPostsIsRefreshing = (state: RootState) =>
    state.posts.isRefreshing;
export const selectPostsIsLoadingBefore = (state: RootState) =>
    state.posts.isLoadingBefore;
export const selectPostsIsLoadingAfter = (state: RootState) =>
    state.posts.isLoadingAfter;
export const selectPostsIsLoading = createSelector(
    selectPostsIsRefreshing,
    selectPostsIsLoadingBefore,
    selectPostsIsLoadingAfter,
    (isRefreshing, isLoadingBefore, isLoadingAfter) =>
        isRefreshing || isLoadingBefore || isLoadingAfter
);

export const { setPostsPathname, setPostsSearchStr } = postsSlice.actions;
export default postsSlice.reducer;
