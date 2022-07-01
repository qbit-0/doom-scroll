import SlideNavBar from "components/SlideNavBar/SlideNavBar";
import React, { FC, useEffect, useState } from "react";

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
    const [show, setShow] = useState<boolean | null>(null);

    useEffect(() => {
        let scrollPos = 0;

        const handleScroll = () => {
            if (window.scrollY <= window.innerHeight) {
                setShow(false);
            } else {
                if (window.scrollY > scrollPos) {
                    setShow(false);
                } else {
                    setShow(true);
                }
            }

            scrollPos = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <SlideNavBar show={show} navBarPaths={MAIN_NAV_BAR_PATHS} />;
};

export default MainNavBar;
