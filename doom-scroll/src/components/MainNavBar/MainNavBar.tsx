import React, { FC } from "react";

import SlideNavBar from "components/SlideNavBar/SlideNavBar";

type Props = {};

enum MainNavBarPath {
    POPULAR = "/r/popular",
    ALL = "/r/all",
}

const MAIN_NAV_BAR_PATHS = {
    [MainNavBarPath.POPULAR]: "r/popular",
    [MainNavBarPath.ALL]: "r/all",
};

const MainNavBar: FC<Props> = () => {
    return <SlideNavBar navBarPaths={MAIN_NAV_BAR_PATHS} bottomMargin={0} />;
};

export default MainNavBar;
