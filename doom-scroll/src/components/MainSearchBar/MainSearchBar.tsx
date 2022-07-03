import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useEffect,
} from "react";

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

type Props = {
    handleNavClick: (path: string, isSearch: boolean) => void;
};

const MainSearchBar: React.FC<Props> = ({ handleNavClick }) => {
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

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.code === "Enter") {
            console.log(event.code);
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        if (searchFilterTempQuery === "") return;
        dispatch(setSearchFilterQuery(searchFilterTempQuery));
        dispatch(setBrowseSearchMode(true));
        handleNavClick("", true);
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
