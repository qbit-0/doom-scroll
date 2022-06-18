import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import postsReducer from "../features/posts/postsSlice";
// import commentsReducer from "../features/comments/commentsSlice";
import listingsReducer from "../features/listings/listingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    // posts: postsReducer,
    // comments: commentsReducer
  },
});
