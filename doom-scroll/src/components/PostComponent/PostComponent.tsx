import { useAppDispatch } from "app/store";
import Author from "components/Author/Author";
import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteVertical from "components/VoteVertical/VoteVertical";
import {
    selectMaxRatio,
    selectMaxSentiment,
    selectMinRatio,
    selectMinSentiment,
} from "features/nlp/nlpSlice";
import { analyzePostComments } from "features/posts/postsSlice";
import { Post } from "lib/reddit/redditData";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = { post: Post };

const PostComponent: React.FC<Props> = ({ post }) => {
    const minScore = useSelector(selectMinSentiment);
    const maxScore = useSelector(selectMaxSentiment);
    const minRatio = useSelector(selectMinRatio);
    const maxRatio = useSelector(selectMaxRatio);
    const dispatch = useAppDispatch();

    const refPost = useRef<HTMLElement>(null);

    useEffect(() => {
        const options = {
            rootMargin: "1000px",
        };

        const observer = new IntersectionObserver((entities) => {
            const entity = entities[0];
            if (entity.isIntersecting) {
                dispatch(analyzePostComments(post));
            }
        }, options);

        if (refPost.current) observer.observe(refPost.current);

        const refPostCopy = refPost;
        return () => {
            if (refPostCopy.current) observer.unobserve(refPostCopy.current);
        };
    }, [dispatch, post]);

    if (
        post.meta.sentiment < minScore ||
        post.meta.sentiment > maxScore ||
        post.data.ratio < minRatio ||
        post.data.ratio > maxRatio
    ) {
        return null;
    }

    return (
        <article
            ref={refPost}
            className="flex overflow-clip mx-auto border-t-2 border-l-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 shadow-xl"
        >
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
                commentSentiment={post.meta.commentsSentiment}
                ratio={post.data.ratio}
            />
        </article>
    );
};

export default PostComponent;
