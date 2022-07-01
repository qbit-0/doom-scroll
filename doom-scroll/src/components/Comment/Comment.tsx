import { CommentData } from "lib/reddit/redditData";
import React, { FC } from "react";

import AuthorComponent from "components/AuthorContainer/AuthorContainer";
import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteHorizontal from "components/VoteHorizontal/VoteHorizontal";

type Props = {
    comment: CommentData;
};

const Comment: FC<Props> = ({ comment }) => {
    const { author, created_utc, body_html, score } = comment.data;

    return (
        <div
            className={`overflow-clip rounded-br-xl bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg`}
        >
            <div className="flex justify-between px-4 pt-4">
                <div className="inline-block">
                    <AuthorComponent
                        author={author}
                        created_utc={created_utc}
                    />
                </div>
                <div className="inline-block">
                    <SentimentBanner sentiment={comment.meta.sentiment} />
                </div>
            </div>

            <div className="px-4 mt-2">
                <SanitizeHTML dirty={body_html} />
            </div>

            <div className="flex justify-around w-full border-t-2 border-neutral-700 mt-2 drop-shadow-lg">
                <VoteHorizontal score={score} />
            </div>
        </div>
    );
};

export default Comment;
