import Article from "pages/Article/Article";
import Browse from "pages/Browse/Browse";
import Intro from "pages/Intro/Intro";
import NoMatch from "pages/NoMatch/NoMatch";
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainNavBar from "components/MainNavBar/MainNavBar";

type Props = {};

const App: FC<Props> = () => {
    return (
        <>
            <Intro />
            <MainNavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="r/popular" />} />

                    <Route path="/r/:subreddit/">
                        <Route path="" element={<Browse />} />
                        <Route path=":sort" element={<Browse />} />
                    </Route>

                    <Route path="/search" element={<Browse />} />

                    <Route
                        path="/r/:subreddit/comments/:articleId/:articleTitle"
                        element={<Article />}
                    >
                        <Route path=":commentId" element={<Article />} />
                    </Route>

                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
