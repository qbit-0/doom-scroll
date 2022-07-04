import React, { FC } from "react";

type Props = {};

const Footer: FC<Props> = () => {
    return (
        <footer className="w-full bg-neutral-800 py-4 text-neutral-50 drop-shadow-lg">
            <p className="relative bottom-0 text-center font-medium">
                Designed and Built by Duy Pham
            </p>
        </footer>
    );
};

export default Footer;
