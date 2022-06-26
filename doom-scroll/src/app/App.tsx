import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../components/Login/Login";
import NavBar from "../components/NavBar/NavBar";
import { updateAppToken } from "../features/auth/authSlice";
import CommentsPage from "../pages/CommentsPage/CommentsPage";
import Hero from "../pages/Hero/Hero";
import PostsPage from "../pages/PostsPage/PostsPage";
import { useAppDispatch } from "./store";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateAppToken());
    }, [dispatch]);

    return (
        <Router>
            <Hero />
            <main className="bg-zinc-900 text-amber-100">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="r/popular" />} />
                    <Route
                        path="/r/:subreddit/"
                        element={<PostsPage />}
                    />
                    <Route
                        path="/r/:subreddit/:sort"
                        element={<PostsPage />}
                    />
                    <Route path="/search" element={<PostsPage />} />
                    <Route
                        path="/r/:subreddit/comments/:articleId/"
                        element={<CommentsPage />}
                    />
                    <Route
                        path="/r/:subreddit/comments/:articleId/:articleTitle"
                        element={<CommentsPage />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<></>} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
