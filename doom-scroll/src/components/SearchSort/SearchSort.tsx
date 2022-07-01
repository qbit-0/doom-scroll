import {
    SEARCH_SORT_OPTIONS,
    SEARCH_TIME_OPTIONS,
    SearchSortOption,
    SearchTimeOption,
} from "lib/reddit/redditFilterOptions";
import React, {
    ChangeEventHandler,
    FC,
    MouseEvent,
    useEffect,
    useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";

type Props = {};

const SearchSort: FC<Props> = () => {
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

    const handleSortClick = (sortOption: SearchSortOption) => {
        return (
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
            event.preventDefault();
            setSort(sortOption);
            setTime(SearchTimeOption.ALL);
        };
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setTime(event.target.value as SearchTimeOption);
    };

    return (
        <div className="py-2">
            <div className="inline-block mx-1">
                <Button onClick={handleSortClick(SearchSortOption.RELEVANCE)}>
                    {SEARCH_SORT_OPTIONS[SearchSortOption.RELEVANCE]}
                </Button>
            </div>

            <div className="inline-block mx-1">
                <Button onClick={handleSortClick(SearchSortOption.HOT)}>
                    <p className="inline font-bold">
                        {SEARCH_SORT_OPTIONS[SearchSortOption.HOT]}
                    </p>
                </Button>
            </div>

            <div className="inline-block mx-1">
                <Button onClick={handleSortClick(SearchSortOption.TOP)}>
                    {SEARCH_SORT_OPTIONS[SearchSortOption.TOP]}
                </Button>
            </div>

            <div className="inline-block mx-1">
                <Button onClick={handleSortClick(SearchSortOption.NEW)}>
                    {SEARCH_SORT_OPTIONS[SearchSortOption.NEW]}
                </Button>
            </div>

            <div className="inline-block mx-1">
                <Button onClick={handleSortClick(SearchSortOption.COMMENTS)}>
                    {SEARCH_SORT_OPTIONS[SearchSortOption.COMMENTS]}
                </Button>
            </div>

            <div className="float-right">
                <Select title="time" value={time} onChange={handleTimeChange}>
                    {Object.entries(SEARCH_TIME_OPTIONS).map(
                        (timeOption, index) => (
                            <Option value={timeOption[0]} key={index}>
                                {timeOption[1]}
                            </Option>
                        )
                    )}
                </Select>
            </div>
        </div>
    );
};

export default SearchSort;
