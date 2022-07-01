import AuthorComponent from "components/AuthorContainer/AuthorContainer";
import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import { CommentData } from "lib/reddit/redditData";
import React, { FC } from "react";
import VoteHorizontal from "components/VoteHorizontal/VoteHorizontal";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";

type Props = {
    comment: CommentData;
};

const Comment: FC<Props> = ({ comment }) => {
    const { author, created_utc, body_html, score } = comment.data;

    return (
        <div
            className={`flex overflow-clip rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg`}
        >
            <div className="w-full px-8">
                <div className="mt-4 mb-2">
                    <AuthorComponent
                        author={author}
                        created_utc={created_utc}
                    />
                    <SanitizeHTML dirty={body_html} />
                </div>
                <div className="my-2">
                    <VoteHorizontal score={score} />
                </div>
            </div>
            <SentimentBanner sentiment={comment.meta.sentiment} />
        </div>
    );
};

export default Comment;
