import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxScore,
  selectMinScore,
  setMaxScore,
  setMinScore,
} from "../../features/nlp/nlpSlice";
import { Button } from "../Button/Button";

export const FilterSentiment = () => {
  const minScore = useSelector(selectMinScore);
  const maxScore = useSelector(selectMaxScore);
  const [currMinScore, setCurrMinScore] = useState(minScore);
  const [currMaxScore, setCurrMaxScore] = useState(maxScore);
  const dispatch = useDispatch();

  useEffect(() => {
    const num = Number(currMinScore);
    if (num !== Number.isNaN) {
      dispatch(setMinScore(num));
    }
  }, [currMinScore]);

  useEffect(() => {
    const num = Number(currMaxScore);
    if (num !== Number.isNaN) {
      dispatch(setMaxScore(num));
    }
  }, [currMaxScore]);

  const handleMinScoreChange = (e) => {
    setCurrMinScore(e.target.value);
  };

  const handleMaxScoreChange = (e) => {
    setCurrMaxScore(e.target.value);
  };

  const handleDoom = () => {
    setCurrMinScore(-5);
    setCurrMaxScore(-0.1);
  };

  const handleBloom = () => {
    setCurrMinScore(0.1);
    setCurrMaxScore(5);
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
          <label for="minScore">Min: </label>
          <input
            type="number"
            id="minScore"
            min={-5}
            max={5}
            step={0.01}
            value={currMinScore}
            onChange={handleMinScoreChange}
            className="p-2 border-2 border-amber-100 rounded-2xl bg-gray-900 text-amber-100"
          />
        </div>

        <div className="inline-block">
          <label for="maxScore">Max: </label>
          <input
            type="number"
            id="maxScore"
            min={-5}
            max={5}
            step={0.01}
            value={currMaxScore}
            onChange={handleMaxScoreChange}
            className="p-2 border-2 border-amber-100 rounded-2xl bg-gray-900 text-amber-100"
          />
        </div>
      </div>
    </div>
  );
};
