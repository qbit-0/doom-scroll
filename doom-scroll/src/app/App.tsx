import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/LoginPage/Login";
import NavBar from "../components/SharedComponents/NavBar/NavBar";
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
            <main>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="r/popular" />} />

                    <Route path="/r/:subreddit/">
                        <Route path="" element={<PostsPage />} />
                        <Route path=":sort" element={<PostsPage />} />
                    </Route>

                    <Route path="/search" element={<PostsPage />} />

                    <Route path="/r/:subreddit/comments/:articleId/">
                        <Route
                            path=":articleTitle"
                            element={<CommentsPage />}
                        />
                        <Route path="" element={<CommentsPage />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
