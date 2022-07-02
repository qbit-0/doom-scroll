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
import { generatePath, useLocation, useNavigate } from "react-router-dom";

import FilterSentiment from "components/FilterSentiment/FilterSentiment";
import PostContainer from "components/PostContainer/PostContainer";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import SearchFilter from "components/SearchFilter/SearchFilter";
import SubredditFilter from "components/SubredditFilter/SubredditFilter";
import {
    selectSearchFilterQuery,
    selectSearchFilterSort,
    selectSearchFilterTime,
} from "features/searchFilter/searchFilterSlice";
import {
    selectSubredditFilterSort,
    selectSubredditFilterSubreddit,
    selectSubredditFilterTime,
} from "features/subredditFilter/subredditFilterSlice";
import {
    SearchSortOption,
    SearchTimeOption,
    SubredditSortOption,
    SubredditTimeOption,
} from "lib/reddit/redditFilterOptions";

type Props = {};

const Browse: React.FC<Props> = () => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectPostsIsRefreshing);
    const isLoading = useSelector(selectPostsIsLoading);
    const after = useSelector(selectPostsAfter);
    const dispatch = useAppDispatch();

    const searchMode = useSelector(selectBrowseSearchMode);

    const filterSubredditSubreddit = useSelector(
        selectSubredditFilterSubreddit
    );
    const filterSubredditSort = useSelector(selectSubredditFilterSort);
    const filterSubredditTime = useSelector(selectSubredditFilterTime);

    const filterSearchQuery = useSelector(selectSearchFilterQuery);
    const filterSearchSort = useSelector(selectSearchFilterSort);
    const filterSearchTime = useSelector(selectSearchFilterTime);

    const navigate = useNavigate();

    useEffect(() => {
        if (searchMode) return;

        const newPathname = generatePath("/r/:subreddit/:sort", {
            subreddit: filterSubredditSubreddit,
            sort: filterSubredditSort,
        });

        const newSearchParams = new URLSearchParams();
        if (
            filterSubredditSort === SubredditSortOption.TOP &&
            filterSubredditTime !== SubredditTimeOption.DAY
        )
            newSearchParams.set("t", filterSubredditTime);

        const url = `${newPathname}?${newSearchParams.toString()}`;

        navigate(url);
    }, [
        navigate,
        searchMode,
        filterSubredditSubreddit,
        filterSubredditSort,
        filterSubredditTime,
    ]);

    useEffect(() => {
        if (!searchMode) return;

        const newSearchParams = new URLSearchParams();

        newSearchParams.set("q", filterSearchQuery);
        if (filterSearchSort !== SearchSortOption.RELEVANCE)
            newSearchParams.set("sort", filterSearchSort);
        if (filterSearchTime !== SearchTimeOption.ALL)
            newSearchParams.set("t", filterSearchTime);

        const url = `/search/?${newSearchParams.toString()}`;
        navigate(url);
    }, [
        navigate,
        searchMode,
        filterSearchQuery,
        filterSearchSort,
        filterSearchTime,
    ]);

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
