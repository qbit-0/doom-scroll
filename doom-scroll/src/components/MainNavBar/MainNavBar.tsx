import React, { FC } from "react";

import { useAppDispatch } from "App/store";
import SlideNavBar from "components/SlideNavBar/SlideNavBar";
import { setBrowseSearchMode } from "features/browse/browseSlice";
import {
    setSearchFilterQuery,
    setSearchFilterSort,
    setSearchFilterTempQuery,
    setSearchFilterTime,
} from "features/searchFilter/searchFilterSlice";
import {
    setSubredditFilterSort,
    setSubredditFilterSubreddit,
    setSubredditFilterTime,
} from "features/subredditFilter/subredditFilterSlice";
import {
    SearchSortOption,
    SearchTimeOption,
    SubredditSortOption,
    SubredditTimeOption,
} from "lib/reddit/redditFilterOptions";

type Props = {};

enum MainNavBarSubreddit {
    POPULAR = "popular",
    ALL = "all",
    POLITICS = "politics",
    GAMING = "gaming",
}

const MAIN_NAV_BAR_SUBREDDITS = {
    [MainNavBarSubreddit.POPULAR]: "r/popular",
    [MainNavBarSubreddit.ALL]: "r/all",
    [MainNavBarSubreddit.POLITICS]: "r/politics",
    [MainNavBarSubreddit.GAMING]: "r/gaming",
};

const MainNavBar: FC<Props> = () => {
    const dispatch = useAppDispatch();

    const handleNavClick = (path: string, isSearch: boolean) => {
        dispatch(setSubredditFilterSort(SubredditSortOption.HOT));
        dispatch(setSubredditFilterTime(SubredditTimeOption.DAY));

        dispatch(setSearchFilterSort(SearchSortOption.RELEVANCE));
        dispatch(setSearchFilterTime(SearchTimeOption.ALL));

        if (isSearch) {
            dispatch(setBrowseSearchMode(true));
        } else {
            dispatch(setSearchFilterQuery(""));
            dispatch(setSearchFilterTempQuery(""));
            dispatch(setBrowseSearchMode(false));
            dispatch(setSubredditFilterSubreddit(path));
        }
    };

    return (
        <SlideNavBar
            navBarPaths={MAIN_NAV_BAR_SUBREDDITS}
            handleNavClick={handleNavClick}
        />
    );
};

export default MainNavBar;
