import {
    SearchSortOption,
    SearchTimeOption,
    SEARCH_SORT_OPTIONS,
    SEARCH_TIME_OPTIONS,
} from "lib/reddit/redditFilterOptions";
import React, { ChangeEventHandler, FC, MouseEvent } from "react";

import { useAppDispatch } from "App/store";
import Button from "components/Button/Button";
import Option from "components/Option/Option";
import Select from "components/Select/Select";
import {
    selectSearchFilterQuery,
    selectSearchFilterSort,
    selectSearchFilterTime,
    setSearchFilterSort,
    setSearchFilterTime,
} from "features/searchFilter/searchFilterSlice";
import { useSelector } from "react-redux";

type Props = {};

const SearchFilter: FC<Props> = () => {
    const filterSearchSort = useSelector(selectSearchFilterSort);
    const filterSearchTime = useSelector(selectSearchFilterTime);
    const dispatch = useAppDispatch();

    const handleSortClick = (sortOption: SearchSortOption) => {
        return (
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
            event.preventDefault();
            dispatch(setSearchFilterSort(sortOption));
            dispatch(setSearchFilterTime(SearchTimeOption.ALL));
        };
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatch(setSearchFilterTime(event.target.value as SearchTimeOption));
    };

    return (
        <div className="justify-left flex flex-wrap gap-2 py-2">
            <Button onClick={handleSortClick(SearchSortOption.RELEVANCE)}>
                {SEARCH_SORT_OPTIONS[SearchSortOption.RELEVANCE]}
            </Button>
            <Button onClick={handleSortClick(SearchSortOption.HOT)}>
                <p className="inline font-bold">
                    {SEARCH_SORT_OPTIONS[SearchSortOption.HOT]}
                </p>
            </Button>
            <Button onClick={handleSortClick(SearchSortOption.TOP)}>
                {SEARCH_SORT_OPTIONS[SearchSortOption.TOP]}
            </Button>
            <Button onClick={handleSortClick(SearchSortOption.NEW)}>
                {SEARCH_SORT_OPTIONS[SearchSortOption.NEW]}
            </Button>
            <Button onClick={handleSortClick(SearchSortOption.COMMENTS)}>
                {SEARCH_SORT_OPTIONS[SearchSortOption.COMMENTS]}
            </Button>
            <Select
                title="time"
                value={filterSearchTime}
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

export default SearchFilter;
