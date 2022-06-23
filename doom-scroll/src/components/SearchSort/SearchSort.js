import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import FilterSentiment from "../FilterSentiment/FilterSentiment";
import Option from "../Option/Option";
import Select from "../Select/Select";

const SearchSort = () => {
  const location = useLocation();
  const [sort, setSort] = useState("relevance");
  const [time, setTime] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const query = search.get("q");
    navigate(`/search?q=${query}&sort=${sort}&t=${time}`);
  }, [sort, time]);

  const handleClickRelevance = (e) => {
    e.preventDefault();
    setSort("relevance");
  };

  const handleClickHot = (e) => {
    e.preventDefault();
    setSort("hot");
  };

  const handleClickTop = (e) => {
    e.preventDefault();
    setSort("top");
  };

  const handleClickNew = (e) => {
    e.preventDefault();
    setSort("new");
  };

  const handleClickComments = (e) => {
    e.preventDefault();
    setSort("comments");
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <div className="inline-block mr-2">
        <Button highlight={sort === "relevance"} onClick={handleClickRelevance}>
          <p className="inline font-bold">Relevance</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "hot"} onClick={handleClickHot}>
          <p className="inline font-bold">Hot</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "top"} onClick={handleClickTop}>
          <p className="inline font-bold">Top</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "new"} onClick={handleClickNew}>
          <p className="inline font-bold">New</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "comments"} onClick={handleClickComments}>
          <p className="inline font-bold">Comments</p>
        </Button>
      </div>

      <div className="float-right">
        <Select value={time} onChange={handleTimeChange}>
          <Option value="all">All Time</Option>
          <Option value="year">Past Year</Option>
          <Option value="month">Past Month</Option>
          <Option value="week">Past Week</Option>
          <Option value="day">Past 24 Hours</Option>
          <Option value="hour">Past Hour</Option>
        </Select>
      </div>

      <div className="mt-2 border-t-2 border-gray-800">
        <div className="mt-2">
          <FilterSentiment />
        </div>
      </div>
    </div>
  );
};

export default SearchSort;
