import React, { FC } from "react";

import SlideNavBar from "components/SlideNavBar/SlideNavBar";

type Props = {};

enum MainNavBarPath {
    POPULAR = "/r/popular",
    ALL = "/r/all",
    // FUNNY = "/r/funny",
    POLITICS = "/r/politics",
    // ASKREDDIT = "/r/AskReddit",
    GAMING = "/r/gaming",
}

const MAIN_NAV_BAR_PATHS = {
    [MainNavBarPath.POPULAR]: "r/popular",
    [MainNavBarPath.ALL]: "r/all",
    // [MainNavBarPath.FUNNY]: "r/funny",
    [MainNavBarPath.POLITICS]: "r/politics",
    // [MainNavBarPath.ASKREDDIT]: "r/AskReddit",
    [MainNavBarPath.GAMING]: "r/gaming",
};

const MainNavBar: FC<Props> = () => {
    return <SlideNavBar navBarPaths={MAIN_NAV_BAR_PATHS} bottomMargin={0} />;
};

export default MainNavBar;
