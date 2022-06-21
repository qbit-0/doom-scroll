import { createSlice } from "@reduxjs/toolkit";

export const nlpSlice = createSlice({
  name: "nlp",
  initialState: {
    minScore: -5,
    maxScore: 5,
  },
  reducers: {
    setMinScore: (state, action) => {
      state.minScore = action.payload;
    },
    setMaxScore: (state, action) => {
      state.maxScore = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const selectMinScore = (state) => state.nlp.minScore;
export const selectMaxScore = (state) => state.nlp.maxScore;

export const { setMinScore, setMaxScore } = nlpSlice.actions;
export default nlpSlice.reducer;
