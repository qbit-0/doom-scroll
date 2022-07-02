import React, { FC, MouseEventHandler } from "react";

import Button from "components/Button/Button";
import MainSearchBar from "components/MainSearchBar/MainSearchBar";

type InnerProps = {
    navBarPaths: {
        [path: string]: string;
    };
    handleNavClick: (path: string) => MouseEventHandler<HTMLButtonElement>;
};
export const NavBar: FC<InnerProps> = ({ navBarPaths, handleNavClick }) => {
    return (
        <div className="mx-auto w-fit">
            <div className="my-2 flex flex-wrap justify-center gap-2">
                {Object.entries(navBarPaths).map((entry, index) => (
                    <Button onClick={handleNavClick(entry[0])} key={index}>
                        <p className="inline font-bold">{entry[1]}</p>
                    </Button>
                ))}
                <MainSearchBar />
            </div>
        </div>
    );
};
