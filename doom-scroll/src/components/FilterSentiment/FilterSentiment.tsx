import {
    selectNlpFilterMaxRatio,
    selectNlpFilterMaxSentiment,
    selectNlpFilterMinRatio,
    selectNlpFilterMinSentiment,
    setNlpFilterMaxRatio,
    setNlpFilterMaxSentiment,
    setNlpFilterMinRatio,
    setNlpFilterMinSentiment,
} from "features/nlpFilter/nlpFilterSlice";
import { NlpPresets } from "lib/utils/nlpPresets";
import React, {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Button/Button";

type Props = {};

const FilterSentiment: FC<Props> = () => {
    const minSentiment = useSelector(selectNlpFilterMinSentiment);
    const maxSentiment = useSelector(selectNlpFilterMaxSentiment);
    const minRatio = useSelector(selectNlpFilterMinRatio);
    const maxRatio = useSelector(selectNlpFilterMaxRatio);
    const [currMinSentiment, setCurrMinSentiment] = useState<number | string>(
        minSentiment
    );
    const [currMaxSentiment, setCurrMaxSentiment] = useState<number | string>(
        maxSentiment
    );
    const [currMinRatio, setCurrMinRatio] = useState<number | string>(minRatio);
    const [currMaxRatio, setCurrMaxRatio] = useState<number | string>(maxRatio);
    const dispatch = useDispatch();

    useEffect(() => {
        const num = Number(currMinSentiment);
        dispatch(setNlpFilterMinSentiment(num));
    }, [dispatch, currMinSentiment]);

    useEffect(() => {
        const num = Number(currMaxSentiment);
        dispatch(setNlpFilterMaxSentiment(num));
    }, [dispatch, currMaxSentiment]);

    useEffect(() => {
        const num = Number(currMinRatio);
        dispatch(setNlpFilterMinRatio(num));
    }, [dispatch, currMinRatio]);

    useEffect(() => {
        const num = Number(currMaxRatio);
        dispatch(setNlpFilterMaxRatio(num));
    }, [dispatch, currMaxRatio]);

    useEffect(() => {
        setCurrMinSentiment(minSentiment);
    }, [minSentiment]);

    useEffect(() => {
        setCurrMaxSentiment(maxSentiment);
    }, [maxSentiment]);

    useEffect(() => {
        setCurrMinRatio(minRatio);
    }, [minRatio]);

    useEffect(() => {
        setCurrMaxRatio(maxRatio);
    }, [maxRatio]);

    const handleWorst = () => {
        setCurrMinSentiment(NlpPresets.worst.minSentiment);
        setCurrMaxSentiment(NlpPresets.worst.maxSentiment);
        setCurrMinRatio(NlpPresets.worst.minRatio);
        setCurrMaxRatio(NlpPresets.worst.maxRatio);
    };

    const handleBest = () => {
        setCurrMinSentiment(NlpPresets.best.minSentiment);
        setCurrMaxSentiment(NlpPresets.best.maxSentiment);
        setCurrMinRatio(NlpPresets.best.minRatio);
        setCurrMaxRatio(NlpPresets.best.maxRatio);
    };

    const handleNeutral = () => {
        setCurrMinSentiment(NlpPresets.neutral.minSentiment);
        setCurrMaxSentiment(NlpPresets.neutral.maxSentiment);
        setCurrMinRatio(NlpPresets.neutral.minRatio);
        setCurrMaxRatio(NlpPresets.neutral.maxRatio);
    };

    const handleReset = () => {
        setCurrMinSentiment(NlpPresets.reset.minSentiment);
        setCurrMaxSentiment(NlpPresets.reset.maxSentiment);
        setCurrMinRatio(NlpPresets.reset.minRatio);
        setCurrMaxRatio(NlpPresets.reset.maxRatio);
    };

    return (
        <>
            <div className="flex flex-wrap justify-center gap-2">
                <Button
                    highlight={minSentiment > 0 && maxSentiment > 0}
                    bgColor="bg-cyan-600"
                    hoverBgColor="hover:bg-cyan-500"
                    onClick={handleBest}
                >
                    Best
                </Button>
                <Button
                    highlight={minSentiment < 0 && maxSentiment < 0}
                    bgColor="bg-rose-600"
                    hoverBgColor="hover:bg-rose-500"
                    onClick={handleWorst}
                >
                    Worst
                </Button>
                <Button
                    highlight={minSentiment === 0 && maxSentiment === 0}
                    bgColor="bg-neutral-600"
                    hoverBgColor="hover:bg-neutral-500"
                    onClick={handleNeutral}
                >
                    Neutral
                </Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>
        </>
    );
};

export default FilterSentiment;
