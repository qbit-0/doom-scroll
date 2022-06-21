import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../Button/Button";
import { Option } from "../Option/Option";
import { Select } from "../Select/Select";

export const SubredditSort = () => {
  const { subreddit } = useParams();
  const [sort, setSort] = useState("hot");
  const [time, setTime] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/r/${subreddit}/${sort}?t=${time}`);
  }, [sort, time]);

  const handleClickHot = (e) => {
    e.preventDefault();
    setSort("hot");
  };

  const handleClickNew = (e) => {
    e.preventDefault();
    setSort("new");
  };

  const handleClickTop = (e) => {
    e.preventDefault();
    setSort("top");
  };

  const handleClickRising = (e) => {
    e.preventDefault();
    setSort("rising");
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <div className="inline-block mr-2">
        <Button highlight={sort === "hot"} onClick={handleClickHot}>
          <p className="inline font-bold">HOT</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "new"} onClick={handleClickNew}>
          <p className="inline font-bold">NEW</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "top"} onClick={handleClickTop}>
          <p className="inline font-bold">TOP</p>
        </Button>
      </div>

      <div className="inline-block">
        <Button highlight={sort === "rising"} onClick={handleClickRising}>
          <p className="inline font-bold">RISING</p>
        </Button>
      </div>

      {sort === "top" && (
        <div className="float-right">
          <Select value={time} onChange={handleTimeChange}>
            <Option value="hour">Now</Option>
            <Option value="day">Today</Option>
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="year">This Year</Option>
            <Option value="all">All Time</Option>
          </Select>{" "}
        </div>
      )}
    </div>
  );
};
