import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import subredditReducer from "../features/subreddit/subredditSlice";
import searchReducer from "../features/search/searchSlice";
import articleReducer from "../features/article/articleSlice";
import nlpReducer from "../features/nlp/nlpSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    subreddit: subredditReducer,
    search: searchReducer,
    article: articleReducer,
    nlp: nlpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
