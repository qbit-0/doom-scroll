import Comment from "components/Comment/Comment";
import Reply from "components/Reply/Reply";
import { selectCommentsReplyTree } from "features/comments/commentsSlice";
import { CommentData } from "lib/reddit/redditData";
import ReplyTreeUtils from "lib/reddit/replyTreeUtils";
import { borderDepthColors } from "lib/utils/replyDepthColors";
import React from "react";
import { useSelector } from "react-redux";
;

type Props = {
    comment: CommentData;
};

const CommentAndRepliesContainer: React.FC<Props> = ({ comment }) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    const borderDepthColor =
        borderDepthColors[comment.data["depth"] % borderDepthColors.length];

    const childReplies = (
        <div className={"pl-2"}>
            {comment.childrenIds.map((childId: number, index: number) => {
                const reply = ReplyTreeUtils.find(replyTree, childId);

                return (
                    <div className="my-2" key={index}>
                        <Reply reply={reply} />
                    </div>
                );
            })}
        </div>
    );

    return (
        <div
            className={`overflow-clip border-t-2 border-l-2 ${borderDepthColor} rounded-tl-3xl`}
        >
            <Comment comment={comment} />
            {comment.childrenIds.length > 0 && childReplies}
        </div>
    );
};

export default CommentAndRepliesContainer;
