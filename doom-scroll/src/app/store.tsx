import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import nlpReducer from "../features/nlp/nlpSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
        nlp: nlpReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
