import {
    SearchSortOption,
    SearchTimeOption,
    SEARCH_SORT_OPTIONS,
    SEARCH_TIME_OPTIONS,
} from "lib/reddit/redditFilterOptions";
import React, {
    ChangeEventHandler,
    MouseEvent,
    useEffect,
    useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchSort = () => {
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState(SearchSortOption.RELEVANCE);
    const [time, setTime] = useState(SearchTimeOption.ALL);
    const navigate = useNavigate();

    useEffect(() => {
        const newSearchParams = new URLSearchParams();

        const query = searchParams.get("q");
        if (query !== null) newSearchParams.set("q", query);
        if (sort !== SearchSortOption.RELEVANCE)
            newSearchParams.set("sort", sort);
        if (time !== SearchTimeOption.ALL) newSearchParams.set("t", time);

        const url = `/search/?${newSearchParams.toString()}`;
        navigate(url);
    }, [navigate, searchParams, sort, time]);

    const handleSortClick = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
        sortOption: SearchSortOption
    ) => {
        event.preventDefault();
        setSort(sortOption);
        setTime(SearchTimeOption.ALL);
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setTime(event.target.value as SearchTimeOption);
    };

    return (
        <div className="py-2">
            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SearchSortOption.RELEVANCE)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SEARCH_SORT_OPTIONS[SearchSortOption.RELEVANCE]}
                    </p>
                </button>
            </div>

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SearchSortOption.HOT)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SEARCH_SORT_OPTIONS[SearchSortOption.HOT]}
                    </p>
                </button>
            </div>

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SearchSortOption.TOP)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SEARCH_SORT_OPTIONS[SearchSortOption.TOP]}
                    </p>
                </button>
            </div>

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SearchSortOption.NEW)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SEARCH_SORT_OPTIONS[SearchSortOption.NEW]}
                    </p>
                </button>
            </div>

            <div className="inline-block mx-1">
                <button
                    onClick={(event) =>
                        handleSortClick(event, SearchSortOption.COMMENTS)
                    }
                    className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                >
                    <p className="inline font-bold">
                        {SEARCH_SORT_OPTIONS[SearchSortOption.COMMENTS]}
                    </p>
                </button>
            </div>

            <div className="float-right">
                <select
                    className="p-2 border-2 border-amber-100 rounded-3xl bg-transparent text-amber-100 font-bold"
                    title="time"
                    value={time}
                    onChange={handleTimeChange}
                >
                    {Object.entries(SEARCH_TIME_OPTIONS).map(
                        (timeOption, index) => (
                            <option
                                value={timeOption[0]}
                                className="bg-zinc-900"
                                key={index}
                            >
                                {timeOption[1]}
                            </option>
                        )
                    )}
                </select>
            </div>
        </div>
    );
};

export default SearchSort;
