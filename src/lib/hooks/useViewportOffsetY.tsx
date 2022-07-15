import { RefObject, useEffect, useState } from "react";

const useViewportOffsetY = (ref: RefObject<HTMLElement>) => {
    const refTop =
        ref.current !== null
            ? ref.current.getBoundingClientRect().top + window.scrollY
            : 0;
    const [viewportOffsetY, setViewportOffsetY] = useState(refTop);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current === null) return;

            const refTop =
                ref.current.getBoundingClientRect().top + window.scrollY;

            setViewportOffsetY(window.scrollY - refTop);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return viewportOffsetY;
};

export default useViewportOffsetY;
