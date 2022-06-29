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
            className="p-2 border-2 border-amber-100 rounded-3xl bg-neutral-800 text-amber-100 font-bold"
        >
            {children}
        </select>
    );
};

export default Select;
