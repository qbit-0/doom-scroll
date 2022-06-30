import SearchBar from "components/SearchBar/SearchBar";
import React, { ChangeEventHandler, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const MainSearchBarContainer: React.FC<Props> = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const navigate = useNavigate();

    const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
        if (event.code === "Enter") {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        const params = new URLSearchParams();
        params.append("q", query);
        navigate(`/search?${params.toString()}`);
    };

    return (
        <SearchBar
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            onSubmit={handleSearchSubmit}
        />
    );
};

export default MainSearchBarContainer;
