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
        <div className="inline-block border-2 border-amber-100 rounded-3xl bg-neutral-900">
            <input
                type="text"
                placeholder="Search Term"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="text-amber-100 p-2 rounded-l-3xl bg-neutral-900 font-bold placeholder:font-thin"
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
