import SlideNavBar from "components/SlideNavBar/SlideNavBar";
import React, { FC } from "react";

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
    return <SlideNavBar navBarPaths={MAIN_NAV_BAR_PATHS} bottomMargin={500} />;
};

export default MainNavBar;
