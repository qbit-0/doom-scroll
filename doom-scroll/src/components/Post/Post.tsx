import AuthorComponent from "components/AuthorContainer/AuthorContainer";
import Body from "components/Body/Body";
import NumComments from "components/NumComments/NumComments";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteHorizontal from "components/VoteHorizontal/VoteHorizontal";
import VoteVertical from "components/VoteVertical/VoteVertical";
import { PostData } from "lib/reddit/redditData";
import React, { FC } from "react";
import { Link } from "react-router-dom";

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
        <article className="overflow-clip mx-auto border-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg">
            <div className="px-4 pt-4">
                <Link to={`/r/${subreddit}`}>
                    <p className="underline text-amber-100 text-sm">{`/r/${subreddit}`}</p>
                </Link>

                <div className="mt-2">
                    <AuthorComponent
                        author={author}
                        created_utc={created_utc}
                    />
                </div>

                <Link to={`${permalink}`}>
                    <h3 className="text-lg sm:text-2xl font-bold text-amber-100">
                        {title}
                    </h3>
                </Link>
            </div>

            <div className="mt-2">
                <Body post={post} />
            </div>

            <div className="flex justify-around w-full border-t-2 border-neutral-700 mt-2 drop-shadow-lg">
                <VoteHorizontal score={score} />
                <Link to={`${permalink}`}>
                    <NumComments num_comments={num_comments} />
                </Link>
            </div>

            <SentimentBanner
                sentiment={post.meta.sentiment}
                ratio={upvote_ratio}
            />
        </article>
    );
};

export default Post;
