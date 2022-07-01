import { useAppDispatch } from "App/store";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import {
    loadPosts,
    loadPostsAfter,
    selectPostDeque,
    selectPostsAfter,
    selectPostsIsLoading,
    selectPostsIsRefreshing,
} from "features/posts/postsSlice";
import React, { useEffect, useRef } from "react";
import { batch, useSelector } from "react-redux";
import { useLocation, useMatch } from "react-router-dom";

import FilterSentiment from "components/FilterSentiment/FilterSentiment";
import PostContainer from "components/PostContainer/PostContainer";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import SearchSort from "components/SearchSort/SearchSort";
import SubredditSort from "components/SubredditSort/SubredditSort";

type Props = {};

const Browse: React.FC<Props> = () => {
    const location = useLocation();
    const searchMatch = useMatch("/search/*");
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectPostsIsRefreshing);
    const isLoading = useSelector(selectPostsIsLoading);
    const after = useSelector(selectPostsAfter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken === null) {
            dispatch(updateAppToken());
        }
    }, [dispatch, accessToken]);

    const refTop = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (refTop.current === null) return;

        window.scroll({
            top: refTop.current.offsetTop,
            behavior: "auto",
        });
    };

    useEffect(() => {
        if (isRefreshing) return;
        scrollToTop();
        batch(() => {
            dispatch(
                loadPosts({
                    pathname: location.pathname,
                    searchStr: location.search,
                })
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, accessToken, location]);

    const refBot = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoading && after !== null) {
            const options = {
                rootMargin: "5000px",
            };

            const observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    dispatch(
                        loadPostsAfter({
                            pathname: location.pathname,
                            searchStr: location.search,
                        })
                    );
                }
            }, options);

            if (refBot.current) observer.observe(refBot.current);

            const refBotCopy = refBot;
            return () => {
                if (refBotCopy.current) observer.unobserve(refBotCopy.current);
            };
        }

        return;
    }, [dispatch, isLoading, after, location]);

    return (
        <div className="bg-neutral-900">
            <div className="ms:px-16 mx-auto max-w-7xl px-2 pb-8">
                <div className="pt-2 pb-8">
                    <div>
                        {searchMatch ? <SearchSort /> : <SubredditSort />}
                    </div>
                    <div className="border-t-2 border-neutral-700 pt-2">
                        <FilterSentiment />
                    </div>
                </div>

                {!isRefreshing &&
                    Object.values(postDeque.data).map((post, index) => (
                        <div className="my-4" key={index}>
                            <PostContainer post={post} />
                        </div>
                    ))}
                {(isLoading || after) && (
                    <div className="my-4">
                        <PostPlaceholder />
                    </div>
                )}
            </div>
            <div ref={refBot} />
        </div>
    );
};

export default Browse;
