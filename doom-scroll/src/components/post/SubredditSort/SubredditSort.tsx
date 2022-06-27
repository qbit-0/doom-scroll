import React, {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useState
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../basic/Button/Button";
import FilterSentiment from "../../shared/FilterSentiment/FilterSentiment";

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
                    <select
                        title="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="p-2 border-2 border-amber-100 rounded-3xl bg-transparent text-amber-100 font-bold"
                    >
                        <option value="hour" className="bg-zinc-900">Now</option>
                        <option value="day" className="bg-zinc-900">Today</option>
                        <option value="week" className="bg-zinc-900">This Week</option>
                        <option value="month" className="bg-zinc-900">This Month</option>
                        <option value="year" className="bg-zinc-900">This Year</option>
                        <option value="all" className="bg-zinc-900">All Time</option>
                    </select>
                </div>
            )}

            <div className="inline-block">
                <Button
                    highlight={sort === "rising"}
                    onClick={handleClickRising}
                >
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
