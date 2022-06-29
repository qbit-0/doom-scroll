import Button from "components/Button";
import { ButtonStyle } from "components/Button/Button";
import InputNumber from "components/InputNumber";
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
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterSentiment = () => {
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

    const handleFilterChange = (
        setCurr: Dispatch<SetStateAction<string | number>>
    ) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setCurr(event.target.value);
        };
    };

    const handleWorst = () => {
        setCurrMinSentiment(-5);
        setCurrMaxSentiment(-0.05);
        setCurrMinRatio(0);
        setCurrMaxRatio(0.95);
    };

    const handleBest = () => {
        setCurrMinSentiment(0.05);
        setCurrMaxSentiment(5);
        setCurrMinRatio(0.95);
        setCurrMaxRatio(1);
    };

    const handleReset = () => {
        setCurrMinSentiment(-5);
        setCurrMaxSentiment(5);
        setCurrMinRatio(0);
        setCurrMaxRatio(1);
    };

    return (
        <>
            <div className="block">
                <div className="inline-block mx-1 my-2">
                    <Button
                        buttonStyle={ButtonStyle.PRIMARY}
                        onClick={handleBest}
                    >
                        Best
                    </Button>
                </div>

                <div className="inline-block mx-1 my-2">
                    <Button
                        buttonStyle={ButtonStyle.PRIMARY}
                        onClick={handleWorst}
                    >
                        Worst
                    </Button>
                </div>

                <div className="inline-block mx-1 my-2">
                    <Button
                        buttonStyle={ButtonStyle.PRIMARY}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <div className="block">
                <div className="inline-block mx-1 my-2">
                    <label htmlFor="minSentiment" className="font-bold mr-2">
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
                    <label htmlFor="maxSentiment" className="font-bold mr-2">
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
                    <label htmlFor="minRatio" className="font-bold mr-2">
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
                    <label htmlFor="maxRatio" className="font-bold mr-2">
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
            </div>
        </>
    );
};

export default FilterSentiment;
