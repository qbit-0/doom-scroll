import { NavBar } from "components/NavBar/NavBar";
import useScrollVel from "lib/hooks/useScrollVel";
import useViewportOffsetY from "lib/hooks/useViewportOffsetY";
import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const MainNavBar: FC<Props> = () => {
    const [show, setShow] = useState<boolean | null>(null);

    const staticNav = useRef<HTMLDivElement>(null);
    const viewportOffsetY = useViewportOffsetY(staticNav);
    const scrollVel = useScrollVel();

    useEffect(() => {
        if (viewportOffsetY - 500 > 0 && scrollVel < 0) {
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
                className="top-0 z-10 w-full bg-neutral-900 p-2 text-neutral-50 drop-shadow-lg"
                ref={staticNav}
            >
                <NavBar />
            </div>

            <div
                className={`invisible fixed top-0 z-10 w-full bg-neutral-900 p-2 text-neutral-50 drop-shadow-lg ${animate}`}
            >
                <NavBar />
            </div>
        </nav>
    );
};

export default MainNavBar;
