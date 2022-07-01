import { selectCommentsReplyTree } from "features/comments/commentsSlice";
import { CommentData } from "lib/reddit/redditData";
import ReplyTreeUtils from "lib/reddit/replyTreeUtils";
import { borderDepthColors } from "lib/utils/replyDepthColors";
import React from "react";
import { useSelector } from "react-redux";

import Comment from "components/Comment/Comment";
import Reply from "components/Reply/Reply";

type Props = {
    comment: CommentData;
};

const CommentAndReplies: React.FC<Props> = ({ comment }) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    const borderDepthColor =
        borderDepthColors[comment.data["depth"] % borderDepthColors.length];

    const childReplies = (
        <div className={"pl-1 sm:pl-2"}>
            {comment.childrenIds.map((childId: number, index: number) => {
                const reply = ReplyTreeUtils.find(replyTree, childId);

                return (
                    <div className="my-1 sm:my-2" key={index}>
                        <Reply reply={reply} />
                    </div>
                );
            })}
        </div>
    );

    return (
        <div
            className={`overflow-clip rounded-tl-xl border-t-2 border-l-2 bg-transparent ${borderDepthColor}`}
        >
            <Comment comment={comment} />
            {comment.childrenIds.length > 0 && childReplies}
        </div>
    );
};

export default CommentAndReplies;
