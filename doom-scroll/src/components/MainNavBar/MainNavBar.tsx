import React, { FC, MouseEvent } from "react";

import { useAppDispatch } from "App/store";
import SlideNavBar from "components/SlideNavBar/SlideNavBar";
import { setBrowseSearchMode } from "features/browse/browseSlice";
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
import {
    setSearchFilterQuery,
    setSearchFilterSort,
    setSearchFilterTempQuery,
    setSearchFilterTime,
} from "features/searchFilter/searchFilterSlice";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleNavClick = (path: string) => {
        return (
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
            event.preventDefault();
            dispatch(setSubredditFilterSubreddit(path));
            dispatch(setSubredditFilterSort(SubredditSortOption.HOT));
            dispatch(setSubredditFilterTime(SubredditTimeOption.DAY));

            dispatch(setSearchFilterQuery(""));
            dispatch(setSearchFilterTempQuery(""));
            dispatch(setSearchFilterSort(SearchSortOption.RELEVANCE));
            dispatch(setSearchFilterTime(SearchTimeOption.ALL));

            dispatch(setBrowseSearchMode(false));

            navigate(`/r/${path}/${SubredditSortOption.HOT}`);
        };
    };

    return (
        <SlideNavBar
            navBarPaths={MAIN_NAV_BAR_SUBREDDITS}
            handleNavClick={handleNavClick}
        />
    );
};

export default MainNavBar;
