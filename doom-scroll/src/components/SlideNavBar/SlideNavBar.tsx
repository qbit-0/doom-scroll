import React, { FC } from "react";
import { InnerNavBar as NavBar } from "../NavBar/NavBar";

type Props = {
    show: boolean | null;
    navBarPaths: {
        [path: string]: string;
    };
};

const SlideNavBar: FC<Props> = ({ show, navBarPaths }) => {
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
                className={`sticky w-full z-10 top-0 p-1 bg-neutral-900 text-amber-100 drop-shadow-lg`}
            >
                <NavBar navBarPaths={navBarPaths} />
            </div>

            <div
                className={`fixed w-full z-10 top-0 p-1 bg-neutral-900 text-amber-100 drop-shadow-lg ${animate}`}
            >
                <NavBar navBarPaths={navBarPaths} />
            </div>
        </nav>
    );
};

export default SlideNavBar;
