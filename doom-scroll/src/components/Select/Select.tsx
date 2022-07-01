import React from "react";
import { ChangeEventHandler, FC } from "react";

type Props = {
    title: string;
    value: string | number;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    children: React.ReactNode;
};

const Select: FC<Props> = ({ title, value, onChange, children }) => {
    return (
        <select
            title={title}
            value={value}
            onChange={onChange}
            className="flex-auto rounded-3xl border-2 border-amber-100 bg-neutral-800  p-[0.6rem] font-bold text-amber-100 outline-none drop-shadow-lg transition-all hover:contrast-200 hover:-hue-rotate-30"
        >
            {children}
        </select>
    );
};

export default Select;
