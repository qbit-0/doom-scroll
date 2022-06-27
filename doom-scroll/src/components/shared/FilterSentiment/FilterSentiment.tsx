import Button from "components/basic/Button/Button";
import {
    selectMaxRatio,
    selectMaxSentiment,
    selectMinRatio,
    selectMinSentiment,
    setMaxRatio,
    setMaxSentiment,
    setMinRatio,
    setMinSentiment
} from "features/nlp/nlpSlice";
import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useState
} from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterSentiment = () => {
    const minSentiment = useSelector(selectMinSentiment);
    const maxSentiment = useSelector(selectMaxSentiment);
    const minRatio = useSelector(selectMinRatio);
    const maxRatio = useSelector(selectMaxRatio);
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

    const handleMinSentimentChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setCurrMinSentiment(event.target.value);
    };

    const handleMaxSentimentChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setCurrMaxSentiment(event.target.value);
    };

    const handleMinRatioChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setCurrMinRatio(event.target.value);
    };

    const handleMaxRatioChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setCurrMaxRatio(event.target.value);
    };

    const handleDoom = () => {
        setCurrMinSentiment(-5);
        setCurrMaxSentiment(-0.1);
        setCurrMinRatio(0);
        setCurrMaxRatio(0.9);
    };

    const handleBloom = () => {
        setCurrMinSentiment(0.1);
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
        <div>
            <div className="block mb-2">
                <div className="inline-block mr-2">
                    <Button highlight={false} onClick={handleDoom}>
                        Doom
                    </Button>
                </div>
                <div className="inline-block mr-2">
                    <Button highlight={false} onClick={handleBloom}>
                        Bloom
                    </Button>
                </div>
                <div className="inline-block mr-2">
                    <Button highlight={false} onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
            <div className="block">
                <div className="inline-block mr-2">
                    <label htmlFor="minSentiment" className="font-bold mr-2">
                        Sentiment Min:
                    </label>
                    <input
                        type="number"
                        id="minSentiment"
                        min={-5}
                        max={5}
                        step={0.01}
                        value={currMinSentiment}
                        onChange={handleMinSentimentChange}
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>

                <div className="inline-block mr-2">
                    <label htmlFor="maxSentiment" className="font-bold mr-2">
                        Sentiment Max:
                    </label>
                    <input
                        type="number"
                        id="maxSentiment"
                        min={-5}
                        max={5}
                        step={0.01}
                        value={currMaxSentiment}
                        onChange={handleMaxSentimentChange}
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>

                <div className="inline-block mr-2">
                    <label htmlFor="minRatio" className="font-bold mr-2">
                        Ratio Min:
                    </label>
                    <input
                        type="number"
                        id="minRatio"
                        min={0}
                        max={1}
                        step={0.01}
                        value={currMinRatio}
                        onChange={handleMinRatioChange}
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>

                <div className="inline-block">
                    <label htmlFor="maxRatio" className="font-bold mr-2">
                        Ratio Max:
                    </label>
                    <input
                        type="number"
                        id="maxRatio"
                        min={0}
                        max={1}
                        step={0.01}
                        value={currMaxRatio}
                        onChange={handleMaxRatioChange}
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSentiment;