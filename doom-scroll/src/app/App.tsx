import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import { useAppDispatch } from "app/store";
import NavBar from "components/shared/NavBar/NavBar";
import { updateAppToken } from "features/auth/authSlice";
import Article from "pages/Article/Article";
import Browse from "pages/Browse/Browse";
import Hero from "pages/Hero/Hero";
import Login from "pages/Login/Login";

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
                        <Route path="" element={<Browse />} />
                        <Route path=":sort" element={<Browse />} />
                    </Route>

                    <Route path="/search" element={<Browse />} />

                    <Route path="/r/:subreddit/comments/:articleId/">
                        <Route
                            path=":articleTitle"
                            element={<Article />}
                        />
                        <Route path="" element={<Article />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
