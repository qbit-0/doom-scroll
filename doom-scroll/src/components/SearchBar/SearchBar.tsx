import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
    ChangeEventHandler,
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
} from "react";

type Props = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const SearchBar: FC<Props> = ({ value, onChange, onKeyDown, onSubmit }) => {
    return (
        <div className="inline-block px-4 border-2 border-amber-100 rounded-3xl bg-neutral-800">
            <input
                type="text"
                placeholder="Search Term"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="text-amber-100 pl-2 py-2 rounded-l-3xl bg-transparent font-bold placeholder:font-thin outline-none"
            />
            <button
                title="submit search term"
                onClick={onSubmit}
                className="p-2 rounded-r-3xl decoration-neutral-600 decoration-4 transition-all font-bold text-amber-100"
            >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
            </button>
        </div>
    );
};

export default SearchBar;
