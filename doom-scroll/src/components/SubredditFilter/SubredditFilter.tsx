import {
    SubredditSortOption,
    SubredditTimeOption,
    SUBREDDIT_SORT_OPTIONS,
    SUBREDDIT_TIME_OPTIONS,
} from "lib/reddit/redditFilterOptions";
import React, { ChangeEventHandler, FC, MouseEvent, useState } from "react";

import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";
import {
    generatePath,
    Location,
    matchPath,
    NavigateFunction,
    useLocation,
    useNavigate,
} from "react-router-dom";

type Props = {};

const SubredditFilter: FC<Props> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [sort, setSort] = useState(SubredditSortOption.HOT);
    const [time, setTime] = useState(SubredditTimeOption.DAY);

    const handleSortClick = (newSort: SubredditSortOption) => {
        return (
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
            event.preventDefault();
            setSort(newSort);
            navigateSubredditFilter(location, navigate, null, newSort, null);
        };
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const newTime = event.target.value as SubredditTimeOption;
        setTime(newTime);

        navigateSubredditFilter(location, navigate, null, null, newTime);
    };

    return (
        <div className="justify-left flex flex-wrap gap-2 py-2">
            <Button onClick={handleSortClick(SubredditSortOption.HOT)}>
                {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.HOT]}
            </Button>
            <Button onClick={handleSortClick(SubredditSortOption.NEW)}>
                {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.NEW]}
            </Button>
            <Button onClick={handleSortClick(SubredditSortOption.TOP)}>
                {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.TOP]}
            </Button>
            {sort === "top" && (
                <Select title="time" value={time} onChange={handleTimeChange}>
                    {Object.entries(SUBREDDIT_TIME_OPTIONS).map(
                        (timeOption, index) => (
                            <Option value={timeOption[0]} key={index}>
                                {timeOption[1]}
                            </Option>
                        )
                    )}
                </Select>
            )}
            <Button onClick={handleSortClick(SubredditSortOption.RISING)}>
                {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.RISING]}
            </Button>
        </div>
    );
};

const navigateSubredditFilter = (
    location: Location,
    navigate: NavigateFunction,
    subreddit: string | null,
    sort: SubredditSortOption | null,
    time: SubredditTimeOption | null
) => {
    const match = matchPath("/r/:subreddit/:sort", location.pathname);

    if (subreddit === null) {
        if (!match?.params.subreddit) subreddit = "popular";
        else subreddit = match.params.subreddit;
    }

    if (sort === null) {
        if (!match?.params.sort) sort = SubredditSortOption.HOT;
        else sort = match.params.sort as SubredditSortOption;
    }

    if (time === null) {
        const searchParams = new URLSearchParams(location.search);
        time = searchParams.get("t") as SubredditTimeOption;
        if (time === null) time = SubredditTimeOption.DAY;
    }

    const newPath = generatePath("/r/:subreddit/:sort", {
        subreddit: subreddit,
        sort: sort,
    });

    const newSearchParams = new URLSearchParams();
    if (sort === "top") newSearchParams.set("t", time);

    navigate(`${newPath}?${newSearchParams.toString()}`);
};

export default SubredditFilter;
