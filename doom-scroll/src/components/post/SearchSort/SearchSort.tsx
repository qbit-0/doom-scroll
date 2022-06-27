import Button from "components/basic/Button/Button";
import FilterSentiment from "components/shared/FilterSentiment/FilterSentiment";
import React, {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useState
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    const handleClickRelevance: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();
        setSort("relevance");
    };

    const handleClickHot: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setSort("hot");
    };

    const handleClickTop: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        setSort("top");
    };

    const handleClickNew: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        setSort("new");
    };

    const handleClickComments: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();

        setSort("comments");
    };

    const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setTime(event.target.value);
    };

    return (
        <div>
            <div className="inline-block mr-2">
                <Button
                    highlight={sort === "relevance"}
                    onClick={handleClickRelevance}
                >
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
                <Button
                    highlight={sort === "comments"}
                    onClick={handleClickComments}
                >
                    <p className="inline font-bold">Comments</p>
                </Button>
            </div>

            <div className="float-right">
                <select className="p-2 border-2 border-amber-100 rounded-3xl bg-transparent text-amber-100 font-bold" title="time" value={time} onChange={handleTimeChange}>
                    <option value="all" className="bg-zinc-900">All Time</option >
                    <option value="year" className="bg-zinc-900">Past Year</option >
                    <option value="month" className="bg-zinc-900">Past Month</option >
                    <option value="week" className="bg-zinc-900">Past Week</option>
                    <option value="day" className="bg-zinc-900">Past 24 Hours</option>
                    <option value="hour" className="bg-zinc-900">Past Hour</option>
                </select>
            </div>

            <div className="mt-2 border-t-2 border-zinc-800">
                <div className="mt-2">
                    <FilterSentiment />
                </div>
            </div>
        </div>
    );
};

export default SearchSort;
