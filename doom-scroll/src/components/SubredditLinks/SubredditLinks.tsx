import Button from "components/Button/Button";
import { SubredditSortOption } from "lib/reddit/redditFilterOptions";
import React, { FC, MouseEvent } from "react";
import { generatePath, useMatch, useNavigate } from "react-router-dom";

type Props = {};
const SubredditLinks: FC<Props> = () => {
    const match = useMatch("/r/:subreddit/:sort");
    const navigate = useNavigate();

    const handleSubredditClick = (subreddit: string) => {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            const newSubredditPath = generatePath("/r/:subreddit/:sort", {
                subreddit: subreddit,
                sort: SubredditSortOption.HOT,
            });
            navigate(newSubredditPath);
        };
    };

    return (
        <>
            <Button
                highlight={match?.params.subreddit === "popular"}
                onClick={handleSubredditClick("popular")}
            >
                r/popular
            </Button>
            <Button
                highlight={match?.params.subreddit === "all"}
                onClick={handleSubredditClick("all")}
            >
                r/all
            </Button>
            <Button
                highlight={match?.params.subreddit === "politics"}
                onClick={handleSubredditClick("politics")}
            >
                r/politics
            </Button>
            <Button
                highlight={match?.params.subreddit === "gaming"}
                onClick={handleSubredditClick("gaming")}
            >
                r/gaming
            </Button>
        </>
    );
};

export default SubredditLinks;
