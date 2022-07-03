import useScrollVel from "lib/hooks/useScrollVel";
import useViewportOffsetY from "lib/hooks/useViewportOffsetY";
import React, { FC, useEffect, useRef, useState } from "react";

import { NavBar } from "../NavBar/NavBar";

type Props = {
    navBarPaths: {
        [path: string]: string;
    };
    handleNavClick: (path: string, isSearch: boolean) => void;
};

const SlideNavBar: FC<Props> = ({ navBarPaths, handleNavClick }) => {
    const [show, setShow] = useState<boolean | null>(null);

    const staticNav = useRef<HTMLDivElement>(null);
    const viewportOffsetY = useViewportOffsetY(staticNav);
    const scrollVel = useScrollVel();

    useEffect(() => {
        if (viewportOffsetY > 0 && scrollVel < 0) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }, [viewportOffsetY, scrollVel, show]);

    let animate = "";
    if (show === null) {
    } else if (show === true) {
        animate = "animate-slidein";
    } else if (show === false) {
        animate = "animate-slideout";
    }

    return (
        <nav>
            <div
                className="top-0 z-10 w-full bg-neutral-900 p-1 text-amber-100 drop-shadow-lg"
                ref={staticNav}
            >
                <NavBar
                    navBarPaths={navBarPaths}
                    handleNavClick={handleNavClick}
                />
            </div>

            <div
                className={`invisible fixed top-0 z-10 w-full bg-neutral-900 p-1 text-amber-100 drop-shadow-lg ${animate}`}
            >
                <NavBar
                    navBarPaths={navBarPaths}
                    handleNavClick={handleNavClick}
                />
            </div>
        </nav>
    );
};

export default SlideNavBar;
