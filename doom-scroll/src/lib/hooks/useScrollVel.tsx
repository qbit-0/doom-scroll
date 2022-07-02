import { useEffect, useState } from "react";

const useScrollVel = () => {
    const [scrollVel, setScrollVel] = useState(0);

    useEffect(() => {
        let lastPageOffset = window.pageYOffset;
        const handleScroll = () => {
            setScrollVel(window.pageYOffset - lastPageOffset);
            lastPageOffset = window.pageYOffset;
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return scrollVel;
};

export default useScrollVel;
