import {
    selectMaxRatio,
    selectMaxSentiment,
    selectMinRatio,
    selectMinSentiment,
    setMaxRatio,
    setMaxSentiment,
    setMinRatio,
    setMinSentiment,
} from "features/nlp/nlpSlice";
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
import { ButtonStyle } from "components/Button/Button";
import InputNumber from "components/InputNumber/InputNumber";

type Props = {};

const FilterSentiment: FC<Props> = () => {
    const minSentiment = useSelector(selectMinSentiment);
    const maxSentiment = useSelector(selectMaxSentiment);
    const minRatio = useSelector(selectMinRatio);
    const maxRatio = useSelector(selectMaxRatio);
    const [currMinSentiment, setCurrMinSentiment] =
        useState<number | string>(minSentiment);
    const [currMaxSentiment, setCurrMaxSentiment] =
        useState<number | string>(maxSentiment);
    const [currMinRatio, setCurrMinRatio] = useState<number | string>(minRatio);
    const [currMaxRatio, setCurrMaxRatio] = useState<number | string>(maxRatio);
    const dispatch = useDispatch();

    useEffect(() => {
        const num = Number(currMinSentiment);
        dispatch(setMinSentiment(num));
    }, [dispatch, currMinSentiment]);

    useEffect(() => {
        const num = Number(currMaxSentiment);
        dispatch(setMaxSentiment(num));
    }, [dispatch, currMaxSentiment]);

    useEffect(() => {
        const num = Number(currMinRatio);
        dispatch(setMinRatio(num));
    }, [dispatch, currMinRatio]);

    useEffect(() => {
        const num = Number(currMaxRatio);
        dispatch(setMaxRatio(num));
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

    const handleFilterChange = (
        setCurr: Dispatch<SetStateAction<string | number>>
    ) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setCurr(event.target.value);
        };
    };

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
                    bgColor="bg-cyan-700"
                    hoverBgColor="hover:bg-cyan-600"
                    onClick={handleBest}
                >
                    Best
                </Button>
                <Button
                    bgColor="bg-rose-700"
                    hoverBgColor="hover:bg-rose-600"
                    onClick={handleWorst}
                >
                    Worst
                </Button>
                <Button
                    bgColor="bg-neutral-700"
                    hoverBgColor="hover:bg-neutral-600"
                    onClick={handleNeutral}
                >
                    Neutral
                </Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>
            {/* <div className="block">
                <div className="inline-block mx-1 my-2">
                    <label
                        htmlFor="minSentiment"
                        className="font-bold mr-2 text-amber-100"
                    >
                        Sentiment Min:
                    </label>
                    <InputNumber
                        id="minSentiment"
                        title="Min Sentiment"
                        min={-5}
                        max={5}
                        step={0.01}
                        value={currMinSentiment}
                        onChange={handleFilterChange(setCurrMinSentiment)}
                    />
                </div>

                <div className="inline-block mx-1 my-2">
                    <label
                        htmlFor="maxSentiment"
                        className="font-bold mr-2 text-amber-100"
                    >
                        Sentiment Max:
                    </label>
                    <InputNumber
                        id="maxSentiment"
                        title="Max Sentiment"
                        min={-5}
                        max={5}
                        step={0.01}
                        value={currMaxSentiment}
                        onChange={handleFilterChange(setCurrMaxSentiment)}
                    />
                </div>

                <div className="inline-block mx-1 my-2">
                    <label
                        htmlFor="minRatio"
                        className="font-bold mr-2 text-amber-100"
                    >
                        Ratio Min:
                    </label>
                    <InputNumber
                        id="minRatio"
                        title="Min Upvote Ratio"
                        min={0}
                        max={1}
                        step={0.01}
                        value={currMinRatio}
                        onChange={handleFilterChange(setCurrMinRatio)}
                    />
                </div>

                <div className="inline-block mx-1 my-2">
                    <label
                        htmlFor="maxRatio"
                        className="font-bold mr-2 text-amber-100"
                    >
                        Ratio Max:
                    </label>
                    <InputNumber
                        id="maxRatio"
                        title="Max Upvote Ratio"
                        min={0}
                        max={1}
                        step={0.01}
                        value={currMaxRatio}
                        onChange={handleFilterChange(setCurrMaxRatio)}
                    />
                </div>
            </div> */}
        </>
    );
};

export default FilterSentiment;
