import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";
import Login from "../components/Login/Login";
import NavBar from "../components/NavBar/NavBar";
import { updateAppToken } from "../features/auth/authSlice";
import CommentsPage from "../pages/CommentsPage/CommentsPage";
import Hero from "../pages/Hero/Hero";
import PostsPage from "../pages/PostsPage/PostsPage";
import { useAppDispatch } from "./store";

const App = () => {
    const dispatch = useAppDispatch();
    const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);

    useEffect(() => {
        dispatch(updateAppToken());
    }, [dispatch]);

    return (
        <Router>
            <Hero />
            <main className="bg-gray-900 text-amber-100">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="r/popular" />} />
                    <Route
                        path="/r/:subreddit/"
                        element={<PostsPage nlp={nlp} />}
                    />
                    <Route
                        path="/r/:subreddit/:sort"
                        element={<PostsPage nlp={nlp} />}
                    />
                    <Route path="/search" element={<PostsPage nlp={nlp} />} />
                    <Route
                        path="/r/:subreddit/comments/:articleId/"
                        element={<CommentsPage nlp={nlp} />}
                    />
                    <Route
                        path="/r/:subreddit/comments/:articleId/:articleTitle"
                        element={<CommentsPage nlp={nlp} />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<></>} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
