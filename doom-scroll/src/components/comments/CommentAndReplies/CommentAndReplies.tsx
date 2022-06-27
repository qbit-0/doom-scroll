import CommentComponent from "components/comments/CommentComponent/CommentComponent";
import ReplyComponent from "components/comments/ReplyComponent/ReplyComponent";
import { selectCommentsReplyTree } from "features/comments/commentsSlice";
import { Comment } from "lib/reddit/redditData";
import ReplyTreeUtils from "lib/reddit/replyTreeUtils";
import { borderDepthColors } from "lib/utils/replyDepthColors";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
    comment: Comment;
};

const CommentAndReplies: React.FC<Props> = ({ comment }) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    const borderDepthColor =
        borderDepthColors[comment.data.depth % borderDepthColors.length];

    const childReplies = (
        <div className={"pl-2"}>
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
            className={`overflow-clip border-t-2 border-l-2 ${borderDepthColor} rounded-tl-3xl`}
        >
            <CommentComponent comment={comment} />
            {comment.childrenIds.length > 0 && childReplies}
        </div>
    );
};

export default CommentAndReplies;
