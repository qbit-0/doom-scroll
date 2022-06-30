import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
    ChangeEventHandler,
    FC,
    FocusEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from "react";

type Props = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const SearchBar: FC<Props> = ({ value, onChange, onKeyDown, onSubmit }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocused(true);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocused(false);
    };

    return (
        <div
            className={`inline-block px-4 border-2 border-amber-100 rounded-3xl bg-neutral-800 drop-shadow-lg hover:contrast-200 hover:-hue-rotate-30 ${
                isFocused && "contrast-200"
            } ${isFocused && "-hue-rotate-30"} transition-all`}
        >
            <input
                type="text"
                placeholder="Search Term"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
