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
    hoverBgColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
};

const Button: FC<Props> = ({
    buttonStyle = ButtonStyle.PRIMARY,
    borderColor = "border-amber-100",
    bgColor = "bg-neutral-800",
    hoverBgColor = "hover:bg-black",
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-auto border-2 p-2 ${borderColor} rounded-3xl ${bgColor} font-bold text-amber-100 drop-shadow-lg ${hoverBgColor} text-sm transition-all sm:text-base`}
        >
            {children}
        </button>
    );
};

export default Button;
