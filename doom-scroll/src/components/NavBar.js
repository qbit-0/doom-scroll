import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  selectMaxScore,
  selectMinScore,
  setMaxScore,
  setMinScore,
} from "../features/nlp/nlpSlice";

export const NavBar = () => {
  const minScore = useSelector(selectMinScore);
  const maxScore = useSelector(selectMaxScore);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  const [time, setTime] = useState("all");
  const [currMinScore, setCurrMinScore] = useState(minScore);
  const [currMaxScore, setCurrMaxScore] = useState(maxScore);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("q", search);
    params.append("sort", sort);
    params.append("t", time);
    navigate(`search?${params.toString()}`);
  };

  const handleCurrMinScoreChange = (e) => {
    setCurrMinScore(Number(e.target.value));
  };

  const handleCurrMaxScoreChange = (e) => {
    setCurrMaxScore(Number(e.target.value));
  };

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    dispatch(setMinScore(currMinScore));
    dispatch(setMaxScore(currMaxScore));
  };

  return (
    <nav className="sticky top-0 p-4 border-l-2 border-b-2 border-gray-800 bg-gradient-to-r from-gray-800 to-gray-900">
      <NavLink to="r/all">
        <p className="inline">ALL</p>
      </NavLink>
      <NavLink to="r/popular">
        <p className="inline">POPULAR</p>
      </NavLink>
      <NavLink to="r/best">
        <p className="inline">BEST</p>
      </NavLink>
      <NavLink to="login">
        <p className="inline">LOG IN</p>
      </NavLink>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          className="text-gray-900"
        />
        <select
          value={sort}
          onChange={handleSortChange}
          className="text-gray-900"
        >
          <option value="relevance">Relevance</option>
          <option value="hot">Hot</option>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="comments">Comments</option>
        </select>
        <select
          value={time}
          onChange={handleTimeChange}
          className="text-gray-900"
        >
          <option value="all">All Time</option>
          <option value="year">Past Year</option>
          <option value="month">Past Month</option>
          <option value="week">Past Week</option>
          <option value="hour">Past Hour</option>
        </select>
        <input type="submit" />
      </form>
      <form onSubmit={handleScoreSubmit}>
        <input
          type="number"
          defaultValue={minScore}
          step="0.01"
          min={-5}
          max={5}
          onChange={handleCurrMinScoreChange}
          className="text-gray-900"
        />
        <input
          type="number"
          defaultValue={maxScore}
          step="0.01"
          min={-5}
          max={5}
          onChange={handleCurrMaxScoreChange}
          className="text-gray-900"
        />
        <input type="submit" />
      </form>
      <button className="">Doom Scroll</button>
      <button>Bloom Scroll</button>
    </nav>
  );
};
