import AuthorComponent from "components/AuthorContainer/AuthorContainer";
import Body from "components/Body/Body";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteVertical from "components/VoteVertical/VoteVertical";
import { PostData } from "lib/reddit/redditData";
import React, { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    post: PostData;
};

const Post: FC<Props> = ({ post }) => {
    return (
        <article className="overflow-clip mx-auto border-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg">
            <div className="px-4 pt-4">
                <VoteVertical score={post.data["score"]} />
                <div className="inline-block mx-4">
                    <div className="my-2">
                        <Link to={`/r/${post.data["subreddit"]}`}>
                            <p className="underline text-amber-100 text-sm">{`/r/${post.data["subreddit"]}`}</p>
                        </Link>
                    </div>
                    <div className="">
                        <AuthorComponent
                            author={post.data["author"]}
                            createdUtc={post.data["created_utc"]}
                        />
                    </div>
                </div>

                <Link to={`${post.data["permalink"]}`}>
                    <h3 className="text-lg sm:text-2xl font-bold text-amber-100">
                        {post.data["title"]}
                    </h3>
                </Link>
            </div>

            <Body post={post} />

            <SentimentBanner
                sentiment={post.meta.sentiment}
                commentSentiment={post.meta.commentsSentiment}
                ratio={post.data["upvote_ratio"]}
            />
        </article>
    );
};

export default Post;
