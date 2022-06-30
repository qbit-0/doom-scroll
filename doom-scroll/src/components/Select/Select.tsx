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
            className="p-[0.6rem] border-2 border-amber-100 rounded-3xl bg-neutral-800 drop-shadow-lg text-amber-100 font-bold outline-none hover:contrast-200 hover:-hue-rotate-30 transition-all"
        >
            {children}
        </select>
    );
};

export default Select;
