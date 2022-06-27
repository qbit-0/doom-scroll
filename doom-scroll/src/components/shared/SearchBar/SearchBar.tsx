import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { KeyboardEventHandler } from "react";

type Props = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const SearchBar: React.FC<Props> = ({
    value,
    onChange,
    onKeyDown,
    onSubmit,
}) => {
    return (
        <div className="inline-block border-2 border-amber-100 rounded-3xl">
            <input
                type="text"
                placeholder="Search Term"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="text-amber-100 p-2 rounded-l-3xl bg-zinc-900 font-bold placeholder:font-thin"
            />
            <button
                title="submit search term"
                onClick={onSubmit}
                className="p-2 rounded-r-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
            >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
            </button>
        </div>
    );
};

export default SearchBar;
