import { PostData } from "lib/reddit/redditData";
import React, { FC } from "react";
import { Link } from "react-router-dom";

import AuthorComponent from "components/AuthorContainer/AuthorContainer";
import Body from "components/Body/Body";
import NumComments from "components/NumComments/NumComments";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteHorizontal from "components/VoteHorizontal/VoteHorizontal";
import { scrollToMain } from "lib/utils/scrollToMain";

type Props = {
    post: PostData;
};

const Post: FC<Props> = ({ post }) => {
    const {
        subreddit,
        author,
        created_utc,
        permalink,
        title,
        score,
        num_comments,
        upvote_ratio,
    } = post.data;

    return (
        <article className="mx-auto overflow-clip rounded-tl-xl rounded-br-xl border-2 border-neutral-700 bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg">
            <div className="px-4 pt-4 sm:px-8 sm:pt-8">
                <Link to={`/r/${subreddit}`}>
                    <p className="text-sm text-neutral-50 underline sm:text-base">{`/r/${subreddit}`}</p>
                </Link>

                <div className="mt-2">
                    <AuthorComponent
                        author={author}
                        created_utc={created_utc}
                    />
                </div>

                <Link to={`${permalink}`}>
                    <h3 className="text-lg font-bold text-neutral-50 sm:text-2xl">
                        {title}
                    </h3>
                </Link>
            </div>

            <div className="mt-2">
                <Body post={post} />
            </div>

            <div className="flex w-full justify-around border-t-2 border-neutral-700 drop-shadow-lg">
                <VoteHorizontal score={score} />
                <Link to={`${permalink}`}>
                    <NumComments num_comments={num_comments} />
                </Link>
            </div>

            <div className="flex">
                <SentimentBanner
                    sentiment={post.meta.sentiment}
                    ratio={upvote_ratio}
                />
            </div>
        </article>
    );
};

export default Post;
