import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

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

export const nlpSlice = createSlice({
    name: "nlp",
    initialState: initialState,
    reducers: {
        setMinSentiment: (state, action: PayloadAction<number>) => {
            state.minSentiment = action.payload;
        },
        setMaxSentiment: (state, action: PayloadAction<number>) => {
            state.maxSentiment = action.payload;
        },
        setMinRatio: (state, action: PayloadAction<number>) => {
            state.minRatio = action.payload;
        },
        setMaxRatio: (state, action: PayloadAction<number>) => {
            state.maxRatio = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const selectMinSentiment = (state: RootState) => state.nlp.minSentiment;
export const selectMaxSentiment = (state: RootState) => state.nlp.maxSentiment;
export const selectMinRatio = (state: RootState) => state.nlp.minRatio;
export const selectMaxRatio = (state: RootState) => state.nlp.maxRatio;

export const { setMinSentiment, setMaxSentiment, setMinRatio, setMaxRatio } =
    nlpSlice.actions;
export default nlpSlice.reducer;
