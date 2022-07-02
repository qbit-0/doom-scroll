import { selectCommentsReplyTree } from "features/article/articleSlice";
import React, { FC } from "react";
import { useSelector } from "react-redux";

import Reply from "components/Reply/Reply";

type Props = {};

const ReplyTree: FC<Props> = () => {
    const replyTree = useSelector(selectCommentsReplyTree);

    return (
        <section>
            {Object.values(replyTree.data)
                .filter((reply) => {
                    return reply.parentId === -1;
                })
                .map((reply, index) => {
                    return (
                        <div className="my-1 sm:my-2" key={index}>
                            <Reply reply={reply} />
                        </div>
                    );
                })}
        </section>
    );
};

export default ReplyTree;
