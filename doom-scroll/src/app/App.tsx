import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "components/MainNavBar";
import Article from "pages/Article";
import Browse from "pages/Browse";
import Hero from "pages/Hero";
import Login from "pages/Login";

type Props = {};

const App: FC<Props> = () => {
    return (
        <>
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
                        <Route path=":articleTitle" element={<Article />} />
                        <Route path="" element={<Article />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
