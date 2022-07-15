import { RefObject, useEffect, useState } from "react";

const useIntersected = (
    ref: RefObject<HTMLElement>,
    options?: IntersectionObserverInit
) => {
    const [intersected, setIntersected] = useState(false);

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            setIntersected(true);
        } else {
            setIntersected(false);
        }
    }, options);

    useEffect(() => {
        if (ref.current === null) return;

        observer.observe(ref.current);
        const refCopy = ref;
        return () => {
            if (refCopy.current) observer.unobserve(refCopy.current);
        };
    });

    return intersected;
};

export default useIntersected;
