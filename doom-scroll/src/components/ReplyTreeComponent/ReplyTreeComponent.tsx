import React from "react";
import { useSelector } from "react-redux";
import { WinkMethods } from "wink-nlp";
import { selectCommentsReplyTree } from "../../features/comments/commentsSlice";
import ReplyComponent from "../ReplyComponent/ReplyComponent";
type Props = {
    nlp: WinkMethods;
};

const ReplyTree: React.FC<Props> = ({ nlp }) => {
    const replyTree = useSelector(selectCommentsReplyTree);

    const replyComponents: JSX.Element[] = [];
    Object.entries(replyTree.data).forEach((entry, index) => {
        const [id, reply] = entry;
        if (reply.parent === -1) {
            replyComponents.push(
                <ReplyComponent id={Number(id)} nlp={nlp} key={index} />
            );
        }
    });

    return <section>{replyComponents}</section>;
};

export default ReplyTree;
