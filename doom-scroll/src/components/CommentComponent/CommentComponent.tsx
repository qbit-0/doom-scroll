import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../features/comments/commentsSlice";
import { replyTreeFind } from "../../reddit/redditDataUtils";
import { replyBorderColors } from "../../utils/commentBorderColors";
import Author from "../Author/Author";
import ReplyComponent from "../ReplyComponent/ReplyComponent";
import SanitizeHTML from "../SanitizeHTML/SanitizeHTML";
import SentimentBanner from "../SentimentBanner/SentimentBanner";
import Vote from "../Vote/Vote";

type Props = {
    id: number;
};

const CommentComponent: React.FC<Props> = ({ id }) => {
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

    const borderColor =
        replyBorderColors[comment.data.depth % replyBorderColors.length];

    const baseComment = (
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

    const childReplies = (
        <div className={"pl-8"}>
            {comment.children.map((childId: number, index: number) => {
                return (
                    <div className="my-2">
                        <ReplyComponent id={childId} key={index} />
                    </div>
                );
            })}
        </div>
    );

    return (
        <div
            className={`overflow-clip border-t-2 border-l-2 ${borderColor} rounded-tl-3xl`}
        >
            {baseComment}
            {comment.children.length > 0 && childReplies}
        </div>
    );
};

export default CommentComponent;
