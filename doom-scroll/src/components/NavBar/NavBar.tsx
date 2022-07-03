import React, { FC } from "react";

import Button from "components/Button/Button";
import MainSearchBar from "components/MainSearchBar/MainSearchBar";
import { SubredditSortOption } from "lib/reddit/redditFilterOptions";

type InnerProps = {
    navBarPaths: {
        [path: string]: string;
    };
    handleNavClick: (path: string, isSearch: boolean) => void;
};
export const NavBar: FC<InnerProps> = ({ navBarPaths, handleNavClick }) => {
    return (
        <div className="mx-auto w-fit">
            <div className="my-2 flex flex-wrap justify-center gap-2">
                {Object.entries(navBarPaths).map((entry, index) => (
                    <Button
                        onClick={() => {
                            handleNavClick(entry[0], false);
                        }}
                        key={index}
                    >
                        {entry[1]}
                    </Button>
                ))}
                <MainSearchBar handleNavClick={handleNavClick} />
            </div>
        </div>
    );
};
