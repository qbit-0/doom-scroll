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

const SubredditSortContainer = () => {
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
                <button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.HOT)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.HOT]}
                    </p>
                </button>
            </div>

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.NEW)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.NEW]}
                    </p>
                </button>
            </div>

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.TOP)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.TOP]}
                    </p>
                </button>
            </div>

            {sort === "top" && (
                <div className="inline-block mx-1">
                    <select
                        title="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-transparent text-amber-100 font-bold"
                    >
                        {Object.entries(SUBREDDIT_TIME_OPTIONS).map(
                            (timeOption, index) => (
                                <option
                                    value={timeOption[0]}
                                    className="bg-neutral-900"
                                    key={index}
                                >
                                    {timeOption[1]}
                                </option>
                            )
                        )}
                    </select>
                </div>
            )}

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SubredditSortOption.RISING)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SUBREDDIT_SORT_OPTIONS[SubredditSortOption.RISING]}
                    </p>
                </button>
            </div>
        </div>
    );
};

export default SubredditSortContainer;
