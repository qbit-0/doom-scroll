import React, { ChangeEventHandler, FC } from "react";

type Props = {
    id: string;
    title: string;
    disabled?: boolean;
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    min?: number;
    max?: number;
    step?: number;
};

const InputNumber: FC<Props> = ({
    id,
    title,
    disabled = false,
    value,
    onChange,
    min,
    max,
    step,
}) => {
    return (
        <input
            id={id}
            title={title}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="rounded-3xl border-2 border-amber-100 bg-neutral-800 p-2 text-center font-bold text-amber-100 outline-none drop-shadow-lg transition-all hover:contrast-200 hover:-hue-rotate-30 focus:contrast-200 focus:-hue-rotate-30"
        />
    );
};

export default InputNumber;
