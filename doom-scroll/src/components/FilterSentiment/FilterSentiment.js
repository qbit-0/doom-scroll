import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxRatio,
  selectMaxSentiment,
  selectMinRatio, selectMinSentiment,
  setMaxRatio,
  setMaxScore as setMaxSentiment,
  setMinRatio,
  setMinScore as setMinSentiment
} from "../../features/nlp/nlpSlice";
import { Button } from "../Button/Button";

export const FilterSentiment = () => {
  const minSentiment = useSelector(selectMinSentiment);
  const maxSentiment = useSelector(selectMaxSentiment);
  const minRatio = useSelector(selectMinRatio);
  const maxRatio = useSelector(selectMaxRatio);
  const [currMinSentiment, setCurrMinSentiment] = useState(minSentiment);
  const [currMaxSentiment, setCurrMaxSentiment] = useState(maxSentiment);
  const [currMinRatio, setCurrMinRatio] = useState(minRatio);
  const [currMaxRatio, setCurrMaxRatio] = useState(maxRatio);
  const dispatch = useDispatch();

  useEffect(() => {
    const num = Number(currMinSentiment);
    if (num !== Number.isNaN) {
      dispatch(setMinSentiment(num));
    }
  }, [currMinSentiment]);

  useEffect(() => {
    const num = Number(currMaxSentiment);
    if (num !== Number.isNaN) {
      dispatch(setMaxSentiment(num));
    }
  }, [currMaxSentiment]);

  useEffect(() => {
    const num = Number(currMinRatio);
    if (num !== Number.isNaN) {
      dispatch(setMinRatio(num));
    }
  }, [currMinRatio]);

  useEffect(() => {
    const num = Number(currMaxRatio);
    if (num !== Number.isNaN) {
      dispatch(setMaxRatio(num));
    }
  }, [currMaxRatio]);

  const handleMinScoreChange = (e) => {
    setCurrMinSentiment(e.target.value);
  };

  const handleMaxScoreChange = (e) => {
    setCurrMaxSentiment(e.target.value);
  };

  const handleMinRatioChange = (e) => {
    setCurrMinRatio(e.target.value);
  };

  const handleMaxRatioChange = (e) => {
    setCurrMaxRatio(e.target.value);
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
    setCurrMinRatio(0.5);
    setCurrMaxRatio(1);
  };

  return (
    <div>
      <div className="inline-block">
        <div className="inline-block mr-2">
          <Button onClick={handleDoom}>Doom</Button>
        </div>
        <div className="inline-block mr-2">
          <Button onClick={handleBloom}>Bloom</Button>
        </div>
      </div>
      <div className="inline-block">
        <div className="inline-block mr-2">
          <label htmlFor="minScore">Sentiment Min: </label>
          <input
            type="number"
            id="minScore"
            min={-5}
            max={5}
            step={0.01}
            value={currMinSentiment}
            onChange={handleMinScoreChange}
            className="p-2 border-2 border-amber-100 rounded-2xl bg-gray-900 text-amber-100"
          />
        </div>

        <div className="inline-block mr-2">
          <label htmlFor="maxScore">Sentiment Max: </label>
          <input
            type="number"
            id="maxScore"
            min={-5}
            max={5}
            step={0.01}
            value={currMaxSentiment}
            onChange={handleMaxScoreChange}
            className="p-2 border-2 border-amber-100 rounded-2xl bg-gray-900 text-amber-100"
          />
        </div>

        <div className="inline-block mr-2">
          <label htmlFor="maxScore">Ratio Min: </label>
          <input
            type="number"
            id="maxScore"
            min={0}
            max={1}
            step={0.01}
            value={currMinRatio}
            onChange={handleMinRatioChange}
            className="p-2 border-2 border-amber-100 rounded-2xl bg-gray-900 text-amber-100"
          />
        </div>

        <div className="inline-block">
          <label htmlFor="maxScore">Ratio Max: </label>
          <input
            type="number"
            id="maxScore"
            min={0}
            max={1}
            step={0.01}
            value={currMaxRatio}
            onChange={handleMaxRatioChange}
            className="p-2 border-2 border-amber-100 rounded-2xl bg-gray-900 text-amber-100"
          />
        </div>
      </div>
    </div>
  );
};
