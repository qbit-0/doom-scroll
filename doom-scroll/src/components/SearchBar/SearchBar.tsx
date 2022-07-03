import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
    ChangeEventHandler,
    FC,
    FocusEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
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
            className={`inline-flex flex-auto justify-between rounded-3xl border-2 border-amber-100 bg-neutral-800 px-4 drop-shadow-lg hover:contrast-200 hover:-hue-rotate-30 ${
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
                className="flex-auto rounded-l-3xl bg-transparent py-2 pl-2 text-sm font-bold text-amber-100 outline-none placeholder:font-thin sm:text-base"
            />
            <button
                title="submit search term"
                onClick={onSubmit}
                className="rounded-r-3xl p-2 font-bold text-amber-100 decoration-neutral-600 decoration-4 transition-all"
            >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
            </button>
        </div>
    );
};

export default SearchBar;
