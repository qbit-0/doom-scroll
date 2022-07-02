import React, { ChangeEventHandler, useEffect } from "react";

import { useAppDispatch } from "App/store";
import SearchBar from "components/SearchBar/SearchBar";
import {
    selectBrowseSearchMode,
    setBrowseSearchMode,
} from "features/browse/browseSlice";
import {
    selectSearchFilterTempQuery,
    setSearchFilterQuery,
    setSearchFilterTempQuery,
} from "features/searchFilter/searchFilterSlice";
import { useSelector } from "react-redux";

type Props = {};

const MainSearchBar: React.FC<Props> = () => {
    const searchMode = useSelector(selectBrowseSearchMode);
    const searchFilterTempQuery = useSelector(selectSearchFilterTempQuery);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!searchMode) {
            dispatch(setSearchFilterTempQuery(""));
            dispatch(setSearchFilterQuery(""));
        }
    }, [dispatch, searchMode]);

    const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(setSearchFilterTempQuery(event.target.value));
    };

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
        if (event.code === "Enter") {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        if (searchFilterTempQuery === "") return;
        dispatch(setSearchFilterQuery(searchFilterTempQuery));
        dispatch(setBrowseSearchMode(true));
    };

    return (
        <SearchBar
            value={searchFilterTempQuery}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            onSubmit={handleSearchSubmit}
        />
    );
};

export default MainSearchBar;
