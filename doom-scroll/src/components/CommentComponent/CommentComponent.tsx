import Author from "components/Author/Author";
import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteHorizontal from "components/VoteHorizontal/VoteHorizontal";
import { Comment } from "lib/reddit/redditData";
import React from "react";

type Props = {
    comment: Comment;
};

const CommentComponent: React.FC<Props> = ({ comment }) => {
    const author = comment.data.author;
    const created = comment.data.created;
    const bodyHTML = comment.data.bodyHTML;
    const upvotes = comment.data.score;
    const sentiment = comment.meta.sentiment;

    return (
        <div
            className={`flex overflow-clip rounded-br-3xl bg-gradient-to-r from-neutral-800 shadow-xl`}
        >
            <div className="w-full px-8">
                <div className="mt-4 mb-2">
                    <Author author={author} created={created} />
                    <SanitizeHTML dirty={bodyHTML} />
                </div>
                <div className="my-2">
                    <VoteHorizontal score={upvotes} />
                </div>
            </div>
            <SentimentBanner sentiment={sentiment} />
        </div>
    );
};

export default CommentComponent;
