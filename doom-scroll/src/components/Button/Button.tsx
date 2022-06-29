import React from "react";
import { FC, MouseEventHandler } from "react";

export enum ButtonStyle {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
}

type Props = {
    buttonStyle?: ButtonStyle;
    borderColor?: string;
    bgColor?: string;
    onClick?: MouseEventHandler;
    children?: React.ReactNode;
};

const Button: FC<Props> = ({
    buttonStyle = ButtonStyle.PRIMARY,
    borderColor = "border-amber-100",
    bgColor = "bg-neutral-800",
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 border-2 ${borderColor} rounded-3xl ${bgColor} transition-all shadow-md font-bold text-amber-100`}
        >
            {children}
        </button>
    );
};

export default Button;