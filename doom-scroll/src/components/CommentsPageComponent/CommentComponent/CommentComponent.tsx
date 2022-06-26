import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../../features/comments/commentsSlice";
import { replyTreeFind } from "../../../reddit/redditDataUtils";
import Author from "../../SharedComponents/Author/Author";
import SanitizeHTML from "../../SharedComponents/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "../../SharedComponents/SentimentBanner/SentimentBanner";
import Vote from "../../SharedComponents/Vote/Vote";

type Props = {
    id: number;
};

const CommentComponent: React.FC<Props> = ({id}) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    if (replyTree === null) {
        return <></>;
    }

    const comment = replyTreeFind(replyTree, id);
    if (!("children" in comment)) {
        throw new Error("comment is not a Comment");
    }

    const author = comment.data.author;
    const created = comment.data.created;
    const bodyHTML = comment.data.bodyHTML;
    const upvotes = comment.data.score;

    const sentiment =
        comment.meta.sentiment !== undefined ? comment.meta.sentiment : 0;
    
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