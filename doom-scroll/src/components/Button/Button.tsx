import React from "react";
import { FC, MouseEventHandler } from "react";

export enum ButtonStyle {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
}

type Props = {
    highlight?: boolean;
    buttonStyle?: ButtonStyle;
    borderColor?: string;
    bgColor?: string;
    hoverBgColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
};

const Button: FC<Props> = ({
    highlight = false,
    buttonStyle = ButtonStyle.PRIMARY,
    bgColor = "bg-neutral-800",
    hoverBgColor = "hover:bg-neutral-700",
    onClick,
    children,
}) => {
    const defaultStyle = `flex-auto rounded-3xl border-2 p-1 text-sm font-bold text-neutral-50 drop-shadow-lg transition-all sm:p-2 sm:text-base border-neutral-700 ${bgColor} ${hoverBgColor}`;
    const highlightStyle = `flex-auto rounded-3xl border-2 p-1 text-sm font-bold text-neutral-50 drop-shadow-lg transition-all sm:p-2 sm:text-base border-neutral-50 text-neutral-900 ${bgColor} ${hoverBgColor}`;

    return (
        <button
            type="button"
            onClick={onClick}
            className={highlight ? highlightStyle : defaultStyle}
        >
            {children}
        </button>
    );
};

export default Button;
