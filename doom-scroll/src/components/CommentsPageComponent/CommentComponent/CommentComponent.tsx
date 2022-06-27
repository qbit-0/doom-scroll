import React from "react";
import { Comment } from "../../../reddit/redditData";
import Author from "../../SharedComponents/Author/Author";
import SanitizeHTML from "../../SharedComponents/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "../../SharedComponents/SentimentBanner/SentimentBanner";
import Vote from "../../SharedComponents/Vote/Vote";

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
            className={`flex overflow-hidden bg-gradient-to-r from-zinc-800 shadow-md`}
        >
            <SentimentBanner sentiment={sentiment} />
            <Vote score={upvotes} />
            <div className="inline-block py-4">
                <div className="mb-2">
                    <Author author={author} created={created} />
                </div>
                <SanitizeHTML dirty={bodyHTML} />
            </div>
        </div>
    );
};

export default CommentComponent;
