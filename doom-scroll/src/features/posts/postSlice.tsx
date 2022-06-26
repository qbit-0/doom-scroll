import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { fetchReddit } from "../../reddit/redditApi";
import { Post, PostDeque } from "../../reddit/redditData";
import { postDequePushBot } from "../../reddit/redditDataUtils";
import {
    parsePostDeque,
    parsePostListing
} from "../../reddit/redditParseUtils";
import { selectAccessToken } from "../auth/authSlice";

export const loadPosts = createAsyncThunk<
    PostDeque,
    void,
    { state: RootState; dispatch: AppDispatch }
>("posts/loadPosts", async (args, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectPostsPathname(thunkApi.getState());
    const search = selectPostsSearch(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (search === null) return thunkApi.rejectWithValue("search is null");

    const json = await fetchReddit(accessToken, pathname, search);
    const postDeque = parsePostDeque(json);
    return postDeque;
});

export const loadPostsAfter = createAsyncThunk<
    Post[],
    void,
    { state: RootState; dispatch: AppDispatch }
>("posts/loadPostsAfter", async (args, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState());
    const pathname = selectPostsPathname(thunkApi.getState());
    const search = selectPostsSearch(thunkApi.getState());
    const after = selectPostsAfter(thunkApi.getState());

    if (accessToken === null)
        return thunkApi.rejectWithValue("accessToken is null");
    if (pathname === null) return thunkApi.rejectWithValue("pathname is null");
    if (search === null) return thunkApi.rejectWithValue("search is null");
    if (after === null) return thunkApi.rejectWithValue("after is null");

    const params = new URLSearchParams(search);
    params.append("after", after);

    const json = await fetchReddit(accessToken, pathname, params.toString());
    const posts = parsePostListing(json);
    return posts;
});

const initialState: {
    pathname: string | null;
    search: string | null;
    postDeque: PostDeque;
    isRefreshing: boolean;
    isLoadingBefore: boolean;
    isLoadingAfter: boolean;
} = {
    pathname: null,
    search: null,
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
        setPathname: (state, action: PayloadAction<string>) => {
            state.pathname = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state, action) => {
                state.isRefreshing = true;
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
            })
            .addCase(loadPostsAfter.fulfilled, (state, action) => {
                action.payload.forEach((post) => {
                    postDequePushBot(state.postDeque, post);
                });
                state.isLoadingAfter = false;
            })
            .addCase(loadPostsAfter.rejected, (state, action) => {
                state.isLoadingAfter = false;
            });
    },
});

export const selectPostsPathname = (state: RootState) => state.posts.pathname;
export const selectPostsSearch = (state: RootState) => state.posts.search;
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

export const { setPathname, setSearch } = postsSlice.actions;
export default postsSlice.reducer;
