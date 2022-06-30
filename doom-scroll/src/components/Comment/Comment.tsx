import AuthorComponent from "components/AuthorContainer";
import SanitizeHTML from "components/SanitizeHTML";
import { CommentData } from "lib/reddit/redditData";
import React, { FC } from "react";
import VoteHorizontal from "components/VoteHorizontal";
import SentimentBanner from "components/SentimentBanner";

type Props = {
    comment: CommentData;
};

const Comment: FC<Props> = ({ comment }) => {
    return (
        <div
            className={`flex overflow-clip rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-700 shadow-lg`}
        >
            <div className="w-full px-8">
                <div className="mt-4 mb-2">
                    <AuthorComponent
                        author={comment.data["author"]}
                        createdUtc={comment.data["created_utc"]}
                    />
                    <SanitizeHTML dirty={comment.data["body_html"]} />
                </div>
                <div className="my-2">
                    <VoteHorizontal score={comment.data["score"]} />
                </div>
            </div>
            <SentimentBanner sentiment={comment.meta.sentiment} />
        </div>
    );
};

export default Comment;
