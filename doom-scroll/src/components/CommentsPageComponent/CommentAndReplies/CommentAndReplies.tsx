import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../../features/comments/commentsSlice";
import { Comment } from "../../../reddit/redditData";
import ReplyTreeUtils from "../../../reddit/replyTreeUtils";
import { replyBorderColors } from "../../../utils/commentBorderColors";
import CommentComponent from "../CommentComponent/CommentComponent";
import ReplyComponent from "../ReplyComponent/ReplyComponent";

type Props = {
    comment: Comment;
};

const CommentAndReplies: React.FC<Props> = ({ comment }) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    const borderColor =
        replyBorderColors[comment.data.depth % replyBorderColors.length];

    const childReplies = (
        <div className={"pl-4"}>
            {comment.childrenIds.map((childId: number, index: number) => {
                const reply = ReplyTreeUtils.find(replyTree, childId);

                return (
                    <div className="my-2" key={index}>
                        <ReplyComponent reply={reply} />
                    </div>
                );
            })}
        </div>
    );

    return (
        <div
            className={`overflow-clip border-t-2 border-l-2 ${borderColor} rounded-tl-3xl`}
        >
            <CommentComponent comment={comment} />
            {comment.childrenIds.length > 0 && childReplies}
        </div>
    );
};

export default CommentAndReplies;
