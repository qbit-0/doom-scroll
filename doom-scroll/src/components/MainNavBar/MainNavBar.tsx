import NavBar from "components/NavBar/NavBar";
import React, { FC } from "react";

type Props = {};

enum MainNavBarPath {
    POPULAR = "/r/popular",
    ALL = "/r/all",
}

const MAIN_NAV_BAR_PATHS = {
    [MainNavBarPath.POPULAR]: "r/all",
    [MainNavBarPath.ALL]: "r/popular",
};

const MainNavBar: FC<Props> = () => {
    return <NavBar navBarPaths={MAIN_NAV_BAR_PATHS} />;
};

export default MainNavBar;
