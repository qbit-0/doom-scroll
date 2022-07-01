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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";

type Props = {};

const SubredditSort: FC<Props> = () => {
    const { subreddit, subredditSort } = useParams();
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState(subredditSort || SubredditSortOption.HOT);
    const [time, setTime] = useState(
        searchParams.get("t") || SubredditTimeOption.DAY
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (subreddit === undefined) return;

        const newSearchParams = new URLSearchParams();
        if (sort === "top" && time !== SubredditTimeOption.DAY)
            newSearchParams.set("t", time);

        const url = `/r/${subreddit}/${sort}/?${newSearchParams.toString()}`;

        navigate(url);
    }, [navigate, subreddit, sort, time]);

    const handleSortClick = (value: SubredditSortOption) => {
        return (
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
            event.preventDefault();
            setSort(value);
            setTime(SubredditTimeOption.DAY);
        };
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setTime(event.target.value as SubredditTimeOption);
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

export default SubredditSort;
