import Article from "pages/Article/Article";
import Browse from "pages/Browse/Browse";
import Intro from "pages/Intro/Intro";
import NoMatch from "pages/NoMatch/NoMatch";
import React, { FC, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainNavBar from "components/MainNavBar/MainNavBar";
import Footer from "components/Footer/Footer";
import useIntersected from "lib/hooks/useIntersected";

type Props = {};

const App: FC<Props> = () => {
    const [hideIntro, setHideIntro] = useState(false);

    const introRef = useRef<HTMLDivElement>(null);
    const introVisible = useIntersected(introRef, { rootMargin: "10px" });

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        if (!introVisible) {
            timeout = setTimeout(() => {
                setHideIntro(true);
            }, 500);
        } else {
            timeout = setTimeout(() => {
                setHideIntro(false);
            }, 500);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [introVisible]);

    return (
        <>
            <div ref={introRef} />
            <Intro />
            <main className="mt-[100vh]">
                <Footer />
                <MainNavBar />
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="r/popular" replace={true} />}
                    />

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
