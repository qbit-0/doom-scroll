import { useAppDispatch } from "App/store";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import {
    loadPosts,
    loadPostsAfter,
    selectBrowseSearchMode,
    selectPostDeque,
    selectPostsAfter,
    selectPostsIsLoading,
    selectPostsIsRefreshing,
} from "features/browse/browseSlice";
import React, { useEffect, useRef } from "react";
import { batch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import FilterSentiment from "components/FilterSentiment/FilterSentiment";
import PostContainer from "components/PostContainer/PostContainer";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import SearchFilter from "components/SearchFilter/SearchFilter";
import SubredditFilter from "components/SubredditFilter/SubredditFilter";
import useIntersected from "lib/hooks/useIntersected";
import useRedirectBrowse from "lib/hooks/useRedirectBrowse";

type Props = {};

const Browse: React.FC<Props> = () => {
    const location = useLocation();
    const searchMode = useSelector(selectBrowseSearchMode);
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectPostsIsRefreshing);
    const isLoading = useSelector(selectPostsIsLoading);
    const after = useSelector(selectPostsAfter);
    const dispatch = useAppDispatch();

    useRedirectBrowse();

    useEffect(() => {
        if (accessToken === null) {
            dispatch(updateAppToken());
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (isRefreshing) return;
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
    const isNearBot = useIntersected(refBot, {
        rootMargin: "2000px",
    });

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if (isNearBot && !isLoading && after !== null) {
            interval = setInterval(() => {
                dispatch(
                    loadPostsAfter({
                        pathname: location.pathname,
                        searchStr: location.search,
                    })
                );
            }, 1000);
        } else {
            if (interval !== null) clearInterval(interval);
        }
        return () => {
            if (interval !== null) clearInterval(interval);
        };
    }, [dispatch, isNearBot, isLoading, after, location]);

    return (
        <div className="bg-neutral-900">
            <div className="mx-auto max-w-7xl px-2 py-2 sm:px-16">
                {searchMode ? <SearchFilter /> : <SubredditFilter />}

                <div className="border-t-2 border-neutral-700 pt-2">
                    <FilterSentiment />
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
