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
            className="p-2 border-2 border-amber-100 rounded-3xl bg-neutral-800 drop-shadow-lg font-bold text-amber-100 text-center outline-none hover:contrast-200 hover:-hue-rotate-30 focus:contrast-200 focus:-hue-rotate-30 transition-all"
        />
    );
};

export default InputNumber;
