import {
    PreloadedState,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import browseReducer from "features/browse/browseSlice";
import articleReducer from "features/article/articleSlice";
import nlpFilterReducer from "features/nlpFilter/nlpFilterSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
    auth: authReducer,
    browse: browseReducer,
    article: articleReducer,
    nlpFilter: nlpFilterReducer,
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
