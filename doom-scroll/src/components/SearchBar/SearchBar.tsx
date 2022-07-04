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
    highlight?: boolean;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
    bgColor?: string;
    hoverBgColor?: string;
};

const SearchBar: FC<Props> = ({
    highlight = false,
    value,
    onChange,
    onKeyDown,
    onSubmit,
    bgColor = "bg-neutral-800",
    hoverBgColor = "hover:bg-neutral-700",
}) => {
    const defaultStyle = `inline-flex flex-auto justify-between rounded-3xl border-2 px-2 text-sm font-bold text-neutral-50 drop-shadow-lg transition-all sm:px-2 sm:text-base border-neutral-700 ${bgColor} ${hoverBgColor}`;
    const highlightStyle = `inline-flex flex-auto justify-between rounded-3xl border-2 px-2 text-sm font-bold text-neutral-50 drop-shadow-lg transition-all sm:px-2 sm:text-base border-neutral-50 ${bgColor} ${hoverBgColor}`;

    return (
        <div className={highlight ? highlightStyle : defaultStyle}>
            <input
                type="text"
                placeholder="Search Term"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="flex-auto bg-transparent p-1 text-sm font-bold text-neutral-50 outline-none placeholder:font-thin sm:p-2 sm:text-base"
            />
            <button
                title="submit search term"
                onClick={onSubmit}
                className="p-1 font-bold text-neutral-50 decoration-neutral-600 decoration-4 transition-all sm:p-2"
            >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
            </button>
        </div>
    );
};

export default SearchBar;
