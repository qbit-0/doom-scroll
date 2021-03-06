import {
    SearchSortOption,
    SearchTimeOption,
    SEARCH_SORT_OPTIONS,
    SEARCH_TIME_OPTIONS,
    SubredditSortOption,
} from "lib/reddit/redditFilterOptions";
import React, { ChangeEventHandler, FC, MouseEvent, useState } from "react";

import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";
import {
    Location,
    NavigateFunction,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

type Props = {};

const SearchFilter: FC<Props> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [time, setTime] = useState(SearchTimeOption.ALL);

    const handleSortClick = (newSort: SearchSortOption) => {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            navigateSearchFilter(location, navigate, null, newSort, null);
        };
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const newTime = event.target.value as SearchTimeOption;
        setTime(newTime);

        navigateSearchFilter(location, navigate, null, null, newTime);
    };

    const searchParams = new URLSearchParams(location.search);
    const urlSort =
        (searchParams.get("sort") as SearchSortOption) ||
        SearchSortOption.RELEVANCE;

    return (
        <div className="justify-left flex flex-wrap gap-2">
            <Button
                highlight={urlSort === SearchSortOption.RELEVANCE}
                onClick={handleSortClick(SearchSortOption.RELEVANCE)}
            >
                {SEARCH_SORT_OPTIONS[SearchSortOption.RELEVANCE]}
            </Button>
            <Button
                highlight={urlSort === SearchSortOption.HOT}
                onClick={handleSortClick(SearchSortOption.HOT)}
            >
                <p className="inline font-bold">
                    {SEARCH_SORT_OPTIONS[SearchSortOption.HOT]}
                </p>
            </Button>
            <Button
                highlight={urlSort === SearchSortOption.TOP}
                onClick={handleSortClick(SearchSortOption.TOP)}
            >
                {SEARCH_SORT_OPTIONS[SearchSortOption.TOP]}
            </Button>
            <Button
                highlight={urlSort === SearchSortOption.NEW}
                onClick={handleSortClick(SearchSortOption.NEW)}
            >
                {SEARCH_SORT_OPTIONS[SearchSortOption.NEW]}
            </Button>
            <Button
                highlight={urlSort === SearchSortOption.COMMENTS}
                onClick={handleSortClick(SearchSortOption.COMMENTS)}
            >
                {SEARCH_SORT_OPTIONS[SearchSortOption.COMMENTS]}
            </Button>
            <Select
                highlight={true}
                title="time"
                value={time}
                onChange={handleTimeChange}
            >
                {Object.entries(SEARCH_TIME_OPTIONS).map(
                    (timeOption, index) => (
                        <Option value={timeOption[0]} key={index}>
                            {timeOption[1]}
                        </Option>
                    )
                )}
            </Select>
        </div>
    );
};

const navigateSearchFilter = (
    location: Location,
    navigate: NavigateFunction,
    query: string | null,
    sort: SearchSortOption | null,
    time: SearchTimeOption | null
) => {
    const searchParams = new URLSearchParams(location.search);

    if (query === null) {
        query = searchParams.get("q");
        if (query === null) query = "";
    }

    if (sort === null) {
        sort =
            (searchParams.get("sort") as SearchSortOption) ||
            SearchSortOption.RELEVANCE;
    }

    if (time === null) {
        time =
            (searchParams.get("t") as SearchTimeOption) || SearchTimeOption.ALL;
    }

    const newPath = "/search";
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("q", query);
    if (sort !== SearchSortOption.RELEVANCE) newSearchParams.set("sort", sort);
    if (time !== SearchTimeOption.ALL) newSearchParams.set("t", time);

    navigate(`${newPath}?${newSearchParams.toString()}`);
};

export default SearchFilter;
