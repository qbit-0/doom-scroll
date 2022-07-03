import React, { FC } from "react";

import MainSearchBar from "components/MainSearchBar/MainSearchBar";
import SubredditLinks from "components/SubredditLinks/SubredditLinks";

type InnerProps = {};
export const NavBar: FC<InnerProps> = () => {
    return (
        <div className="mx-auto w-fit">
            <div className="my-2 flex flex-wrap justify-center gap-2">
                <SubredditLinks />
                <MainSearchBar />
            </div>
        </div>
    );
};
