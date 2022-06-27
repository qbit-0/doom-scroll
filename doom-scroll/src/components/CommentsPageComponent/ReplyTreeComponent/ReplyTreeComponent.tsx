import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../../features/comments/commentsSlice";
import ReplyComponent from "../ReplyComponent/ReplyComponent";

type Props = {};

const ReplyTreeComponent: React.FC<Props> = () => {
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
                            <ReplyComponent reply={reply} />
                        </div>
                    );
                })}
        </section>
    );
};

export default ReplyTreeComponent;
