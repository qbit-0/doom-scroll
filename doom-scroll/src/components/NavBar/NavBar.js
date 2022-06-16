import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  const [time, setTime] = useState("all");

  const [sentiment, setSentiment] = useState(0);

  const navigate = useNavigate();

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

  const handleSentimentChange = (e) => {
    setSentiment(e.target.value);
  };
  const handleSentimentSubmit = (e) => {};

  return (
    <nav className="sticky top-0 bg-red-400">
      <NavLink to="r/all">ALL</NavLink>
      <NavLink to="r/popular">POPULAR</NavLink>
      <NavLink to="r/best">BEST</NavLink>
      <NavLink to="login">Log In</NavLink>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <select value={sort} onChange={handleSortChange}>
          <option value="relevance">Relevance</option>
          <option value="hot">Hot</option>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="comments">Comments</option>
        </select>
        <select value={time} onChange={handleTimeChange}>
          <option value="all">All Time</option>
          <option value="year">Past Year</option>
          <option value="month">Past Month</option>
          <option value="week">Past Week</option>
          <option value="hour">Past Hour</option>
        </select>
        <input type="submit" />
      </form>
      <form onSubmit={handleSentimentSubmit}>
        <input
          type="number"
          value={sentiment}
          onChange={handleSentimentChange}
        />
        <input type="submit" />
      </form>
      <button className="">Doom Scroll</button>
      <button>Bloom Scroll</button>
    </nav>
  );
};
