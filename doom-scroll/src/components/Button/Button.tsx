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
    const sharedStyle = `flex-auto rounded-3xl border-2 py-1 px-2 text-sm font-bold text-neutral-50 drop-shadow-lg transition-all sm:p-2 sm:text-base ${bgColor} ${hoverBgColor}`;
    const defaultStyle = `${sharedStyle} border-neutral-700 `;
    const highlightStyle = `${sharedStyle} border-neutral-50`;

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
