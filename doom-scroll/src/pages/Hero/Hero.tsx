import { useAppDispatch } from "App/store";
import {
    setMaxRatio,
    setMaxSentiment,
    setMinRatio,
    setMinSentiment,
} from "features/nlp/nlpSlice";
import { NlpPresets } from "lib/utils/nlpPresets";
import React, { FC } from "react";
import { batch } from "react-redux";

import Button from "components/Button/Button";

type Props = {};

const Hero: FC<Props> = () => {
    const dispatch = useAppDispatch();

    const handleWorst = () => {
        batch(() => {
            dispatch(setMinSentiment(NlpPresets.worst.minSentiment));
            dispatch(setMaxSentiment(NlpPresets.worst.maxSentiment));
            dispatch(setMinRatio(NlpPresets.worst.minRatio));
            dispatch(setMaxRatio(NlpPresets.worst.maxRatio));
        });
    };

    const handleBest = () => {
        batch(() => {
            dispatch(setMinSentiment(NlpPresets.best.minSentiment));
            dispatch(setMaxSentiment(NlpPresets.best.maxSentiment));
            dispatch(setMinRatio(NlpPresets.best.minRatio));
            dispatch(setMaxRatio(NlpPresets.best.maxRatio));
        });
    };

    return (
        <div className="h-screen bg-neutral-900">
            <header>
                <blockquote
                    cite="www.merriam-webster.com"
                    className="mx-auto max-w-md px-8 pt-8 sm:pt-16"
                >
                    <p className="text-md p-4 text-justify font-serif font-light text-amber-100 sm:text-lg">
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
                <h2 className="mt-16 text-center text-2xl font-light text-amber-100">
                    The{" "}
                    <Button
                        bgColor="bg-cyan-700"
                        hoverBgColor="hover:bg-cyan-600"
                        onClick={handleBest}
                    >
                        Best
                    </Button>{" "}
                    and{" "}
                    <Button
                        bgColor="bg-rose-700"
                        hoverBgColor="hover:bg-rose-600"
                        onClick={handleWorst}
                    >
                        Worst
                    </Button>{" "}
                    of Reddit.
                </h2>
            </header>

            <footer className="absolute bottom-0 w-full bg-neutral-800 py-4 text-amber-100 drop-shadow-lg">
                <p className="relative bottom-0 text-center font-medium">
                    Designed and Built by Duy Pham
                </p>
            </footer>
        </div>
    );
};

export default Hero;
