import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../../features/comments/commentsSlice";
import { replyTreeFind } from "../../../reddit/redditDataUtils";
import { replyBorderColors } from "../../../utils/commentBorderColors";
import CommentComponent from "../CommentComponent/CommentComponent";
import ReplyComponent from "../ReplyComponent/ReplyComponent";

type Props = {
    id: number;
};

const CommentAndReplies: React.FC<Props> = ({ id }) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    if (replyTree === null) {
        return <></>;
    }

    const comment = replyTreeFind(replyTree, id);
    if (!("children" in comment)) {
        throw new Error("comment is not a Comment");
    }

    const borderColor =
        replyBorderColors[comment.data.depth % replyBorderColors.length];

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
            <CommentComponent id={id} />
            {comment.children.length > 0 && childReplies}
        </div>
    );
};

export default CommentAndReplies;
