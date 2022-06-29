
import Reply from "components/Reply/Reply";
import { selectCommentsReplyTree } from "features/comments/commentsSlice";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const ReplyTreeContainer: React.FC<Props> = () => {
    const replyTree = useSelector(selectCommentsReplyTree);

    return (
        <section>
            {Object.values(replyTree.data)
                .filter((reply) => {
                    return reply.parentId === -1;
                })
                .map((reply, index) => {
                    return (
                        <div className="my-2" key={index}>
                            <Reply reply={reply} />
                        </div>
                    );
                })}
        </section>
    );
};

export default ReplyTreeContainer;
