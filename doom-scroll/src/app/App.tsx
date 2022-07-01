import Article from "pages/Article/Article";
import Browse from "pages/Browse/Browse";
import Hero from "pages/Hero/Hero";
import Login from "pages/Login/Login";
import NoMatch from "pages/NoMatch/NoMatch";
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "components/MainNavBar/MainNavBar";

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
                        <Route path=":subredditSort" element={<Browse />} />
                    </Route>

                    <Route path="/search" element={<Browse />} />

                    <Route
                        path="/r/:subreddit/comments/:articleId/:articleTitle"
                        element={<Article />}
                    >
                        <Route path=":commentId" element={<Article />} />
                    </Route>

                    <Route path="/login" element={<Login />} />

                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
