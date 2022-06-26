import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../../features/comments/commentsSlice";
import ReplyComponent from "../ReplyComponent/ReplyComponent";

type Props = {};

const ReplyTree: React.FC<Props> = () => {
    const replyTree = useSelector(selectCommentsReplyTree);

    const replyComponents: JSX.Element[] = [];
    Object.entries(replyTree.data).forEach((entry, index) => {
        const [id, reply] = entry;
        if (reply.parent === -1) {
            replyComponents.push(<div className="my-2">
                <ReplyComponent id={Number(id)} />
            </div>);
        }
    });

    return <section>{replyComponents}</section>;
};

export default ReplyTree;
