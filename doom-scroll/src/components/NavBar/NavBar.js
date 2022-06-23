import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  selectMaxScore,
  selectMaxSentiment,
  selectMinScore,
  selectMinSentiment,
  setMaxScore,
  setMinScore,
} from "../../features/nlp/nlpSlice";
import { Button } from "../Button/Button";
import { SearchBar } from "../SearchBar/SearchBar";

export const NavBar = () => {
  const location = useLocation();
  const minSentiment = useSelector(selectMinSentiment);
  const maxSentiment = useSelector(selectMaxSentiment);

  const [search, setSearch] = useState("");
  const [currMinSentiment, setCurrMinSentiment] = useState(minSentiment);
  const [currMaxSentiment, setCurrMaxSentiment] = useState(maxSentiment);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavClick = (subreddit) => {
    navigate(`/r/${subreddit}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    params.append("q", search);
    navigate(`/search?${params.toString()}`);
  };

  const handleCurrMinScoreChange = (e) => {
    setCurrMinSentiment(Number(e.target.value));
  };

  const handleCurrMaxScoreChange = (e) => {
    setCurrMaxSentiment(Number(e.target.value));
  };

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    dispatch(setMinScore(currMinSentiment));
    dispatch(setMaxScore(currMaxSentiment));
  };

  return (
    <nav className="sticky top-0 p-4 border-b-2 border-gray-800 bg-gray-900">
      <div className="w-fit mx-auto">
        <div className="inline-block">
          <div className="inline-block mr-2">
            <Button
              highlight={matchPath(location.pathname, "/r/popular")}
              onClick={(e) => {
                handleNavClick("popular");
              }}
            >
              <p className="inline font-bold">r/popular</p>
            </Button>
          </div>

          <div className="inline-block mr-2">
            <Button
              highlight={matchPath(location.pathname, "/r/all")}
              onClick={(e) => {
                handleNavClick("all");
              }}
            >
              <p className="inline font-bold">r/all</p>
            </Button>
          </div>
        </div>

        <div className="inline-block">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>
    </nav>
  );
};
