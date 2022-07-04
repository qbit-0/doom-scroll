import { useAppDispatch } from "App/store";
import {
    selectNlpFilterMaxSentiment,
    selectNlpFilterMinSentiment,
    setNlpFilterMaxRatio,
    setNlpFilterMaxSentiment,
    setNlpFilterMinRatio,
    setNlpFilterMinSentiment,
} from "features/nlpFilter/nlpFilterSlice";
import { NlpPresets } from "lib/utils/nlpPresets";
import React, { FC, useEffect, useRef, useState } from "react";
import { batch, useSelector } from "react-redux";

import Button from "components/Button/Button";
import useIntersected from "lib/hooks/useIntersected";

type Props = {};

const Hero: FC<Props> = () => {
    const minSentiment = useSelector(selectNlpFilterMinSentiment);
    const maxSentiment = useSelector(selectNlpFilterMaxSentiment);
    const [hideHero, setHideHero] = useState(false);
    const dispatch = useAppDispatch();

    const heroRef = useRef<HTMLDivElement>(null);
    const heroVisible = useIntersected(heroRef);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;
        if (heroVisible) {
            clearTimeout(timeout);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setHideHero(true);
            }, 2000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [heroVisible]);

    const handleWorst = () => {
        batch(() => {
            dispatch(setNlpFilterMinSentiment(NlpPresets.worst.minSentiment));
            dispatch(setNlpFilterMaxSentiment(NlpPresets.worst.maxSentiment));
            dispatch(setNlpFilterMinRatio(NlpPresets.worst.minRatio));
            dispatch(setNlpFilterMaxRatio(NlpPresets.worst.maxRatio));
        });
    };

    const handleBest = () => {
        batch(() => {
            dispatch(setNlpFilterMinSentiment(NlpPresets.best.minSentiment));
            dispatch(setNlpFilterMaxSentiment(NlpPresets.best.maxSentiment));
            dispatch(setNlpFilterMinRatio(NlpPresets.best.minRatio));
            dispatch(setNlpFilterMaxRatio(NlpPresets.best.maxRatio));
        });
    };

    return (
        <div
            ref={heroRef}
            className={`h-screen bg-neutral-900 ${hideHero && "hidden"}`}
        >
            <header>
                <blockquote
                    cite="www.merriam-webster.com"
                    className="mx-auto max-w-md px-8 pt-8 sm:pt-16"
                >
                    <p className="text-md p-4 text-justify font-serif font-light text-neutral-50 sm:text-lg">
                        Doomscrolling refers to the tendency to continue to surf
                        or scroll through bad news, even though that news is
                        saddening, disheartening, or depressing.
                    </p>
                </blockquote>
                <h1 className="mt-16 text-center text-7xl font-black sm:text-8xl">
                    <p className="inline-block animate-shake bg-gradient-to-t from-rose-600 to-black bg-clip-text text-transparent drop-shadow-lg">
                        Doom
                    </p>
                    <p className="inline-block bg-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
                        Scroll
                    </p>
                </h1>
                <h2 className="mt-16 text-center text-2xl font-light text-neutral-50">
                    The{" "}
                    <Button
                        highlight={minSentiment > 0 && maxSentiment > 0}
                        bgColor="bg-cyan-600"
                        hoverBgColor="hover:bg-cyan-500"
                        onClick={handleBest}
                    >
                        <p className="text-lg">Best</p>
                    </Button>{" "}
                    and{" "}
                    <Button
                        highlight={minSentiment < 0 && maxSentiment < 0}
                        bgColor="bg-rose-600"
                        hoverBgColor="hover:bg-rose-500"
                        onClick={handleWorst}
                    >
                        <p className="text-lg">Worst</p>
                    </Button>{" "}
                    of Reddit.
                </h2>
            </header>
        </div>
    );
};

export default Hero;
