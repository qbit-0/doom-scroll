import {
    SUBREDDIT_SORT_OPTIONS,
    SUBREDDIT_TIME_OPTIONS,
    SubredditSortOption,
    SubredditTimeOption,
} from "lib/reddit/redditFilterOptions";
import React, {
    ChangeEventHandler,
    FC,
    MouseEvent,
    useEffect,
    useState,
} from "react";
import {
    generatePath,
    matchPath,
    matchRoutes,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";

import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";
import { useAppDispatch } from "App/store";
import {
    selectSubredditFilterSort,
    selectSubredditFilterSubreddit,
    selectSubredditFilterTime,
    setSubredditFilterSort,
    setSubredditFilterTime,
} from "features/subredditFilter/subredditFilterSlice";
import { useSelector } from "react-redux";

type Props = {};

const SubredditFilter: FC<Props> = () => {
    const filterSort = useSelector(selectSubredditFilterSort);
    const filterTime = useSelector(selectSubredditFilterTime);
    const dispatch = useAppDispatch();

    const handleSortClick = (value: SubredditSortOption) => {
        return (
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
            event.preventDefault();
            dispatch(setSubredditFilterSort(value));
            dispatch(setSubredditFilterTime(SubredditTimeOption.DAY));
        };
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatch(
            setSubredditFilterTime(event.target.value as SubredditTimeOption)
        );
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
            {filterSort === "top" && (
                <Select
                    title="time"
                    value={filterTime}
                    onChange={handleTimeChange}
                >
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

export default SubredditFilter;
