import Button from "components/Button/Button";
import { SubredditSortOption } from "lib/reddit/redditFilterOptions";
import React, { FC, MouseEvent } from "react";
import { generatePath, useNavigate } from "react-router-dom";

type Props = {};
const SubredditLinks: FC<Props> = () => {
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
            <Button onClick={handleSubredditClick("popular")}>r/popular</Button>
            <Button onClick={handleSubredditClick("all")}>r/all</Button>
            <Button onClick={handleSubredditClick("politics")}>
                r/politics
            </Button>
            <Button onClick={handleSubredditClick("gaming")}>r/gaming</Button>
        </>
    );
};

export default SubredditLinks;
