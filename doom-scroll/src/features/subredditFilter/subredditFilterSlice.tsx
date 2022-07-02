import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "App/store";
import {
    SubredditSortOption,
    SubredditTimeOption,
} from "lib/reddit/redditFilterOptions";

const initialState: {
    subreddit: string;
    sort: SubredditSortOption;
    time: SubredditTimeOption;
} = {
    subreddit: "popular",
    sort: SubredditSortOption.HOT,
    time: SubredditTimeOption.DAY,
};

export const subredditFilterSlice = createSlice({
    name: "subredditFilter",
    initialState: initialState,
    reducers: {
        setSubredditFilterSubreddit: (state, action: PayloadAction<string>) => {
            state.subreddit = action.payload;
        },
        setSubredditFilterSort: (
            state,
            action: PayloadAction<SubredditSortOption>
        ) => {
            state.sort = action.payload;
        },
        setSubredditFilterTime: (
            state,
            action: PayloadAction<SubredditTimeOption>
        ) => {
            state.time = action.payload;
        },
    },
});

export const selectSubredditFilterSubreddit = (state: RootState) =>
    state.subredditFilter.subreddit;
export const selectSubredditFilterSort = (state: RootState) =>
    state.subredditFilter.sort;
export const selectSubredditFilterTime = (state: RootState) =>
    state.subredditFilter.time;

export const {
    setSubredditFilterSubreddit,
    setSubredditFilterSort,
    setSubredditFilterTime,
} = subredditFilterSlice.actions;
export default subredditFilterSlice.reducer;
