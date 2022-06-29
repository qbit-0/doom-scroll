import AuthorComponent from "containers/AuthorContainer/AuthorContainer";
import SanitizeHTML from "containers/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "containers/SentimentBanner/SentimentBanner";
import VoteHorizontal from "containers/VoteHorizontal/VoteHorizontal";
import React, { FC } from "react";

type Props = {
    author: string;
    createdUtc: number;
    bodyHtml: string;
    score: number;
    sentiment: number;
};

const Comment: FC<Props> = ({
    author,
    createdUtc,
    bodyHtml,
    score,
    sentiment,
}) => {
    return (
        <div
            className={`flex overflow-clip rounded-br-3xl bg-gradient-to-r from-neutral-800 shadow-lg`}
        >
            <div className="w-full px-8">
                <div className="mt-4 mb-2">
                    <AuthorComponent author={author} createdUtc={createdUtc} />
                    <SanitizeHTML dirty={bodyHtml} />
                </div>
                <div className="my-2">
                    <VoteHorizontal score={score} />
                </div>
            </div>
            <SentimentBanner sentiment={sentiment} />
        </div>
    );
};

export default Comment;
