import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";
import {
    SubredditSortOption,
    SubredditTimeOption,
    SUBREDDIT_SORT_OPTIONS,
    SUBREDDIT_TIME_OPTIONS,
} from "lib/reddit/redditFilterOptions";
import React, {
    ChangeEventHandler,
    MouseEvent,
    useEffect,
    useState,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const SubredditSort = () => {
    const { subreddit, pathnameSort } = useParams();
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState(pathnameSort || SubredditSortOption.HOT);
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

    const handleSortClick = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
        value: SubredditSortOption
    ) => {
        event.preventDefault();
        setSort(value);
        setTime(SubredditTimeOption.DAY);
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setTime(event.target.value as SubredditTimeOption);
    };

    return (
        <div className="py-2">
            <div className="inline-block mx-1">
                <Button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.HOT)
                    }
                >
                    {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.HOT]}
                </Button>
            </div>

            <div className="inline-block mx-1">
                <Button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.NEW)
                    }
                >
                    {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.NEW]}
                </Button>
            </div>

            <div className="inline-block mx-1">
                <Button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.TOP)
                    }
                >
                    {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.TOP]}
                </Button>
            </div>

            {sort === "top" && (
                <div className="inline-block mx-1">
                    <Select
                        title="time"
                        value={time}
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
                </div>
            )}

            <div className="inline-block mx-1">
                <Button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.RISING)
                    }
                >
                    {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.RISING]}
                </Button>
            </div>
        </div>
    );
};

export default SubredditSort;
