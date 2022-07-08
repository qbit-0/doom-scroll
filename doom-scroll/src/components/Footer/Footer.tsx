import React, { FC } from "react";

type Props = {};

const IntroBanner: FC<Props> = () => {
    return (
        <footer className="flex w-full items-center justify-center bg-neutral-800 p-2 text-neutral-50 drop-shadow-lg">
            <p className="text-center text-xs font-medium text-neutral-50">
                Designed and Built by Duy Pham
            </p>
        </footer>
    );
};

export default IntroBanner;
