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

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        setCurr: Dispatch<SetStateAction<string | number>>
    ) => {
        setCurr(event.target.value);
    };

    const handleDoom = () => {
        setCurrMinSentiment(-5);
        setCurrMaxSentiment(-0.1);
        setCurrMinRatio(0);
        setCurrMaxRatio(0.95);
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
            <div className="block">
                <div className="inline-block mx-1 my-2">
                    <button
                        onClick={handleDoom}
                        className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                    >
                        Doom
                    </button>
                </div>
                <div className="inline-block mx-1 my-2">
                    <button
                        onClick={handleBloom}
                        className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                    >
                        Bloom
                    </button>
                </div>
                <div className="inline-block mx-1 my-2">
                    <button
                        onClick={handleReset}
                        className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="block">
                <div className="inline-block mx-1 my-2">
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
                        onChange={(event) =>
                            handleChange(event, setCurrMinSentiment)
                        }
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>

                <div className="inline-block mx-1 my-2">
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
                        onChange={(event) =>
                            handleChange(event, setCurrMaxSentiment)
                        }
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>

                <div className="inline-block mx-1 my-2">
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
                        onChange={(event) =>
                            handleChange(event, setCurrMinRatio)
                        }
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>

                <div className="inline-block mx-1 my-2">
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
                        onChange={(event) =>
                            handleChange(event, setCurrMaxRatio)
                        }
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-zinc-900 text-amber-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSentiment;
