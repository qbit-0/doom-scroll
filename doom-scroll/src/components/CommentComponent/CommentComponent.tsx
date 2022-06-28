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
    return (
        <div
            className={`flex overflow-clip rounded-br-3xl bg-gradient-to-r from-neutral-800 shadow-lg`}
        >
            <div className="w-full px-8">
                <div className="mt-4 mb-2">
                    <Author
                        author={comment.data["author"]}
                        created={comment.data["created"]}
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

export default CommentComponent;
