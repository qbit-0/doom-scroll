import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEventHandler, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const SearchBarContainer: React.FC<Props> = () => {
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
        <div className="inline-block border-2 border-amber-100 rounded-3xl">
            <input
                type="text"
                placeholder="Search Term"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                className="text-amber-100 p-2 rounded-l-3xl bg-neutral-900 font-bold placeholder:font-thin"
            />
            <button
                title="submit search term"
                onClick={handleSearchSubmit}
                className="p-2 rounded-r-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
            >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
            </button>
        </div>
    );
};

export default SearchBarContainer;
