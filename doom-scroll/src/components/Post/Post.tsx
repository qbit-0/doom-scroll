import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteVertical from "components/VoteVertical/VoteVertical";
import AuthorComponent from "components/AuthorContainer/AuthorContainer";
import ImagePreview from "components/ImagePreview/ImagePreview";
import { PostData } from "lib/reddit/redditData";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Body from "components/Body/Body";

type Props = {
    post: PostData;
};

const Post: FC<Props> = ({ post }) => {
    return (
        <article className="flex overflow-clip mx-auto border-t-2 border-l-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg">
            <VoteVertical score={post.data["score"]} />

            <div className="w-full px-4 py-8">
                <div className="my-2">
                    <Link to={`/r/${post.data["subreddit"]}`}>
                        <p className="underline text-amber-100">{`/r/${post.data["subreddit"]}`}</p>
                    </Link>
                </div>

                <div className="mt-4">
                    <AuthorComponent
                        author={post.data["author"]}
                        createdUtc={post.data["created_utc"]}
                    />
                </div>

                <div className="mt-4">
                    <Link to={`${post.data["permalink"]}`}>
                        <h3 className="text-2xl font-bold text-amber-100">
                            {post.data["title"]}
                        </h3>
                    </Link>
                </div>

                <div className="my-4">
                    <Body post={post} />
                </div>
            </div>

            <SentimentBanner
                sentiment={post.meta.sentiment}
                commentSentiment={post.meta.commentsSentiment}
                ratio={post.data["upvote_ratio"]}
            />
        </article>
    );
};

export default Post;
