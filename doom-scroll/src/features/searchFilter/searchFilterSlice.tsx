import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "App/store";
import {
    SearchSortOption,
    SearchTimeOption,
} from "lib/reddit/redditFilterOptions";

const initialState: {
    query: string;
    tempQuery: string;
    sort: SearchSortOption;
    time: SearchTimeOption;
} = {
    query: "",
    tempQuery: "",
    sort: SearchSortOption.RELEVANCE,
    time: SearchTimeOption.ALL,
};

export const searchFilterSlice = createSlice({
    name: "searchFilter",
    initialState: initialState,
    reducers: {
        setSearchFilterQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSearchFilterTempQuery: (state, action: PayloadAction<string>) => {
            state.tempQuery = action.payload;
        },
        setSearchFilterSort: (
            state,
            action: PayloadAction<SearchSortOption>
        ) => {
            state.sort = action.payload;
        },
        setSearchFilterTime: (
            state,
            action: PayloadAction<SearchTimeOption>
        ) => {
            state.time = action.payload;
        },
    },
});

export const selectSearchFilterQuery = (state: RootState) =>
    state.searchFitler.query;
export const selectSearchFilterTempQuery = (state: RootState) =>
    state.searchFitler.tempQuery;
export const selectSearchFilterSort = (state: RootState) =>
    state.searchFitler.sort;
export const selectSearchFilterTime = (state: RootState) =>
    state.searchFitler.time;

export const {
    setSearchFilterQuery,
    setSearchFilterTempQuery,
    setSearchFilterSort,
    setSearchFilterTime,
} = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
