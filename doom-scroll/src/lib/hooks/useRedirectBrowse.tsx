import { selectBrowseSearchMode } from "features/browse/browseSlice";
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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

const useRedirectBrowse = () => {
    const filterSubredditSubreddit = useSelector(
        selectSubredditFilterSubreddit
    );
    const filterSubredditSort = useSelector(selectSubredditFilterSort);
    const filterSubredditTime = useSelector(selectSubredditFilterTime);
    const filterSearchQuery = useSelector(selectSearchFilterQuery);
    const filterSearchSort = useSelector(selectSearchFilterSort);
    const filterSearchTime = useSelector(selectSearchFilterTime);
    const searchMode = useSelector(selectBrowseSearchMode);
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
};

export default useRedirectBrowse;
