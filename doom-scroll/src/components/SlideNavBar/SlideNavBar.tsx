import React, { FC, useEffect, useRef, useState } from "react";

import { NavBar } from "../NavBar/NavBar";

type Props = {
    navBarPaths: {
        [path: string]: string;
    };
    bottomMargin: number;
};

const SlideNavBar: FC<Props> = ({ navBarPaths, bottomMargin }) => {
    const [show, setShow] = useState<boolean | null>(null);

    const staticNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let lastPageOffset = window.pageYOffset;
        const handleScroll = () => {
            if (staticNav.current === null) {
                return;
            }

            const staticNavTop =
                staticNav.current.getBoundingClientRect().top +
                window.scrollY +
                bottomMargin;

            if (
                staticNavTop &&
                window.scrollY > staticNavTop &&
                window.pageYOffset < lastPageOffset
            ) {
                setShow(true);
            } else if (show === true) {
                setShow(false);
            }
            lastPageOffset = window.pageYOffset;
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [bottomMargin, show]);

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
                <NavBar navBarPaths={navBarPaths} />
            </div>

            <div
                className={`invisible fixed top-0 z-10 w-full bg-neutral-900 p-1 text-amber-100 drop-shadow-lg ${animate}`}
            >
                <NavBar navBarPaths={navBarPaths} />
            </div>
        </nav>
    );
};

export default SlideNavBar;
