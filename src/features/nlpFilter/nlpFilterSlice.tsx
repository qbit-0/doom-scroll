import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "App/store";

const initialState: {
    minSentiment: number;
    maxSentiment: number;
    minRatio: number;
    maxRatio: number;
} = {
    minSentiment: -5,
    maxSentiment: 5,
    minRatio: 0,
    maxRatio: 1,
};

export const nlpFilterSlice = createSlice({
    name: "nlpFilter",
    initialState: initialState,
    reducers: {
        setNlpFilterMinSentiment: (state, action: PayloadAction<number>) => {
            state.minSentiment = action.payload;
        },
        setNlpFilterMaxSentiment: (state, action: PayloadAction<number>) => {
            state.maxSentiment = action.payload;
        },
        setNlpFilterMinRatio: (state, action: PayloadAction<number>) => {
            state.minRatio = action.payload;
        },
        setNlpFilterMaxRatio: (state, action: PayloadAction<number>) => {
            state.maxRatio = action.payload;
        },
    },
});

export const selectNlpFilterMinSentiment = (state: RootState) =>
    state.nlpFilter.minSentiment;
export const selectNlpFilterMaxSentiment = (state: RootState) =>
    state.nlpFilter.maxSentiment;
export const selectNlpFilterMinRatio = (state: RootState) =>
    state.nlpFilter.minRatio;
export const selectNlpFilterMaxRatio = (state: RootState) =>
    state.nlpFilter.maxRatio;

export const {
    setNlpFilterMinSentiment,
    setNlpFilterMaxSentiment,
    setNlpFilterMinRatio,
    setNlpFilterMaxRatio,
} = nlpFilterSlice.actions;
export default nlpFilterSlice.reducer;
