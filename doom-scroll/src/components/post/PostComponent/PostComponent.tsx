import VoteVertical from "components/post/VoteVertical/VoteVertical";
import Author from "components/shared/Author/Author";
import SanitizeHTML from "components/shared/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "components/shared/SentimentBanner/SentimentBanner";
import {
    selectMaxRatio,
    selectMaxSentiment,
    selectMinRatio,
    selectMinSentiment,
} from "features/nlp/nlpSlice";
import { Post } from "lib/reddit/redditData";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = { post: Post };

const PostComponent: React.FC<Props> = ({ post }) => {
    const minScore = useSelector(selectMinSentiment);
    const maxScore = useSelector(selectMaxSentiment);
    const minRatio = useSelector(selectMinRatio);
    const maxRatio = useSelector(selectMaxRatio);

    if (
        post.meta.sentiment < minScore ||
        post.meta.sentiment > maxScore ||
        post.data.ratio < minRatio ||
        post.data.ratio > maxRatio
    ) {
        return <></>;
    }

    return (
        <article className="flex overflow-clip mx-auto border-t-2 border-l-2 border-zinc-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-zinc-800 shadow-xl">
            <VoteVertical score={post.data.score} />

            <div className="w-full px-4 py-8">
                <div className="my-2">
                    <Link to={`/r/${post.data.subreddit}`}>
                        <p className="underline">{`/r/${post.data.subreddit}`}</p>
                    </Link>
                </div>

                <div className="mt-4">
                    <Author
                        author={post.data.author}
                        created={post.data.created}
                    />
                </div>

                <div className="mt-4">
                    <Link to={`${post.data.permalink}`}>
                        <h3 className="text-3xl font-bold">
                            {post.data.title}
                        </h3>
                    </Link>
                </div>

                {post.data.preview !== undefined && (
                    <div className="my-4">
                        <a
                            title="post preview"
                            href={post.data.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <figure className="max-w-2xl max-h-96 mt-4 mx-auto rounded-3xl overflow-clip shadow-xl">
                                <img
                                    alt="post preview"
                                    src={post.data.preview}
                                    className="block w-full h-full"
                                />
                            </figure>
                        </a>
                    </div>
                )}

                {post.data.selftextHTML !== undefined && (
                    <div>
                        <SanitizeHTML dirty={post.data.selftextHTML} />
                    </div>
                )}
            </div>

            <SentimentBanner
                sentiment={post.meta.sentiment}
                ratio={post.data.ratio}
            />
        </article>
    );
};

export default PostComponent;
