import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    selectMaxRatio,
    selectMaxSentiment,
    selectMinRatio,
    selectMinSentiment
} from "../../../features/nlp/nlpSlice";
import { Post } from "../../../reddit/redditData";
import Author from "../../SharedComponents/Author/Author";
import SanitizeHTML from "../../SharedComponents/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "../../SharedComponents/SentimentBanner/SentimentBanner";
import Vote from "../../SharedComponents/Vote/Vote";

type Props = { post: Post };

const PostComponent: React.FC<Props> = ({ post }) => {
    const minScore = useSelector(selectMinSentiment);
    const maxScore = useSelector(selectMaxSentiment);
    const minRatio = useSelector(selectMinRatio);
    const maxRatio = useSelector(selectMaxRatio);

    const author = post.data.author;
    const created = post.data.created;
    const title = post.data.title;
    const permalink = post.data.permalink;

    let preview = null;
    if (post.data.preview !== undefined) {
        preview = post.data.preview;
    }

    const url = post.data.url;
    const selftextHTML = post.data.selftextHTML;
    const score = post.data.score;
    const ratio = post.data.ratio;
    const sentiment = post.meta.sentiment;

    if (
        sentiment < minScore ||
        sentiment > maxScore ||
        ratio < minRatio ||
        ratio > maxRatio
    ) {
        return <></>;
    }

    return (
        <article className="flex overflow-clip mx-auto border-t-2 border-l-2 border-zinc-700 rounded-tl-3xl bg-gradient-to-r from-zinc-800 shadow-md">
            <SentimentBanner sentiment={sentiment} ratio={ratio} />

            <Vote score={score} />

            <div className="flex-grow-0 w-full py-8">
                <Link to={`/r/${post.data.subreddit}`}>
                    <p className="underline">{`/r/${post.data.subreddit}`}</p>
                </Link>

                <div className="mt-4">
                    <Author author={author} created={created} />
                </div>

                <div className="mt-4">
                    <Link to={`${permalink}`}>
                        <h3 className="text-3xl font-bold">{title}</h3>
                    </Link>
                </div>

                {preview !== null && (
                    <div className="my-4">
                        <a
                            title="post preview"
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <figure className="max-w-2xl max-h-96 mt-4 mx-auto rounded-3xl overflow-clip shadow-md">
                                <img
                                    alt="post preview"
                                    src={preview}
                                    className="block w-full h-full"
                                />
                            </figure>
                        </a>
                    </div>
                )}

                {selftextHTML !== undefined && (
                    <div>
                        <SanitizeHTML dirty={selftextHTML} />
                    </div>
                )}
            </div>
        </article>
    );
};

export default PostComponent;
