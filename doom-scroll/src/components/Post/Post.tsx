import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteVertical from "components/VoteVertical/VoteVertical";
import AuthorComponent from "containers/AuthorContainer/AuthorContainer";
import Preview from "containers/PreviewContainer/PreviewContainer";
import { PostData } from "lib/reddit/redditData";
import React, { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    post: PostData;
};

const Post: FC<Props> = ({ post }) => {
    return (
        <article
            // ref={refPost}
            className="flex overflow-clip mx-auto border-t-2 border-l-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 shadow-lg"
        >
            <VoteVertical score={post.data["score"]} />

            <div className="w-full px-4 py-8">
                <div className="my-2">
                    <Link to={`/r/${post.data["subreddit"]}`}>
                        <p className="underline">{`/r/${post.data["subreddit"]}`}</p>
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
                        <h3 className="text-2xl font-bold">
                            {post.data["title"]}
                        </h3>
                    </Link>
                </div>

                {post.data?.["preview"]?.["images"]?.[0]?.["source"]?.[
                    "url"
                ] !== undefined && (
                    <Preview
                        imgSrc={
                            post.data?.["preview"]?.["images"]?.[0]?.[
                                "source"
                            ]?.["url"]
                        }
                        href={post.data["url_overridden_by_dest"]}
                    />
                )}

                {post.data["selftext_html"] !== undefined && (
                    <div className="overflow-y-auto max-h-[20rem] my-4">
                        <SanitizeHTML dirty={post.data["selftext_html"]} />
                    </div>
                )}
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
