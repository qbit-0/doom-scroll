import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../BasicStyledComponents/Button/Button";
import FilterSentiment from "../../SharedComponents/FilterSentiment/FilterSentiment";
import Option from "../../BasicStyledComponents/Option/Option";
import Select from "../../BasicStyledComponents/Select/Select";

const SubredditSort = () => {
  const { subreddit } = useParams();
  const [sort, setSort] = useState("hot");
  const [time, setTime] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/r/${subreddit}/${sort}?t=${time}`);
  }, [sort, time]);

  const handleClickHot: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSort("hot");
  };

  const handleClickNew: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSort("new");
  };

  const handleClickTop: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSort("top");
  };

  const handleClickRising: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSort("rising");
  };

  const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <div className="inline-block mr-2">
        <Button highlight={sort === "hot"} onClick={handleClickHot}>
          <p className="inline font-bold">Hot</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "new"} onClick={handleClickNew}>
          <p className="inline font-bold">New</p>
        </Button>
      </div>

      <div className="inline-block mr-2">
        <Button highlight={sort === "top"} onClick={handleClickTop}>
          <p className="inline font-bold">Top</p>
        </Button>
      </div>

      {sort === "top" && (
        <div className="inline-block mr-2">
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

      <div className="inline-block">
        <Button highlight={sort === "rising"} onClick={handleClickRising}>
          <p className="inline font-bold">Rising</p>
        </Button>
      </div>

      <div className="mt-2 border-t-2 border-zinc-700">
        <div className="mt-2">
          <FilterSentiment />
        </div>
      </div>
    </div>
  );
};

export default SubredditSort;
