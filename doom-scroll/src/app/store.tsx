import {
    combineReducers,
    configureStore,
    PreloadedState,
} from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import commentsReducer from "features/comments/commentsSlice";
import nlpReducer from "features/nlp/nlpSlice";
import postsReducer from "features/posts/postsSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    nlp: nlpReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState,
    });
    return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;

const store = setupStore();
export default store;
