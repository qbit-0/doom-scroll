import { createSlice } from "@reduxjs/toolkit";

export const nlpSlice = createSlice({
  name: "nlp",
  initialState: {
    minSentiment: -5,
    maxSentiment: 5,
    minRatio: 0,
    maxRatio: 1,
  },
  reducers: {
    setMinScore: (state, action) => {
      state.minSentiment = action.payload;
    },
    setMaxScore: (state, action) => {
      state.maxSentiment = action.payload;
    },
    setMinRatio: (state, action) => {
      state.minRatio = action.payload;
    },
    setMaxRatio: (state, action) => {
      state.maxRatio = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const selectMinSentiment = (state) => state.nlp.minSentiment;
export const selectMaxSentiment = (state) => state.nlp.maxSentiment;
export const selectMinRatio = (state) => state.nlp.minRatio;
export const selectMaxRatio = (state) => state.nlp.maxRatio;

export const {setMinScore, setMaxScore, setMinRatio, setMaxRatio } =
  nlpSlice.actions;
export default nlpSlice.reducer;
