import React from "react";
import { useSelector } from "react-redux";
import { WinkMethods } from "wink-nlp";
import { selectCommentsReplyTree } from "../../features/comments/commentsSlice";
import { replyTreeFind } from "../../reddit/redditDataUtils";
import Author from "../Author/Author";
import ReplyComponent from "../ReplyComponent/ReplyComponent";
import SanitizeHTML from "../SanitizeHTML/SanitizeHTML";
import SentimentBanner from "../SentimentBanner/SentimentBanner";
import Vote from "../Vote/Vote";

type Props = {
    id: number;
    nlp: WinkMethods;
};

const CommentComponent: React.FC<Props> = ({ id, nlp }) => {
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

    const baseComment = (
        <div className="flex overflow-hidden my-4 border-t-2 border-l-2 border-gray-800 rounded-tl-3xl bg-gray-900 shadow-md">
            <SentimentBanner sentiment={sentiment} />
            <Vote score={upvotes} />
            <div className="inline-block py-8">
                <div className="inline-block">
                    <Author author={author} created={created} />
                    <div className="mt-2">
                        <SanitizeHTML dirty={bodyHTML} />
                    </div>
                </div>
            </div>
        </div>
    );

    const childReplies = (
        <div className="pl-4 my-4 border-l-2 border-amber-100">
            {comment.children.map((childId: number, index: number) => {
                return <ReplyComponent id={childId} nlp={nlp} key={index} />;
            })}
        </div>
    );

    return (
        <div>
            {baseComment}
            {comment.children.length > 0 && childReplies}
        </div>
    );
};

export default CommentComponent;
