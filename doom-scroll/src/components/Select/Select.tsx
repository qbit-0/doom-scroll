import React from "react";
import { ChangeEventHandler, FC } from "react";

type Props = {
    highlight?: boolean;
    title: string;
    value: string | number;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    children: React.ReactNode;
    bgColor?: string;
    hoverBgColor?: string;
};

const Select: FC<Props> = ({
    highlight = false,
    title,
    value,
    onChange,
    children,
    bgColor = "bg-neutral-800",
    hoverBgColor = "hover:bg-neutral-700",
}) => {
    const defaultStyle = `flex-auto rounded-3xl border-2 p-1 text-sm font-bold text-neutral-50 outline-none drop-shadow-lg transition-all sm:p-2 sm:text-base "border-neutral-700" ${bgColor} ${hoverBgColor}`;
    const highlightStyle = `flex-auto rounded-3xl border-2 p-1 text-sm font-bold text-neutral-50 outline-none drop-shadow-lg transition-all sm:p-2 sm:text-base border-neutral-50 text-neutral-900 ${bgColor} ${hoverBgColor}`;

    return (
        <select
            title={title}
            value={value}
            onChange={onChange}
            className={highlight ? highlightStyle : defaultStyle}
        >
            {children}
        </select>
    );
};

export default Select;
