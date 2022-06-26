import React from "react";
import { useSelector } from "react-redux";
import { WinkMethods } from "wink-nlp";
import { selectCommentsReplyTree } from "../../features/comments/commentsSlice";
import { replyTreeFind } from "../../reddit/redditDataUtils";
import CommentComponent from "../CommentComponent/CommentComponent";
import MoreComponent from "../MoreComponent/MoreComponent";

type Props = {
    id: number;
    nlp: WinkMethods;
};

const ReplyComponent: React.FC<Props> = ({ id, nlp }) => {
    const replyTree = useSelector(selectCommentsReplyTree);
    const reply = replyTreeFind(replyTree, id);
    if ("children" in reply) {
        return <CommentComponent id={id} nlp={nlp} />;
    }
    return <MoreComponent id={id} nlp={nlp} />;
};

export default ReplyComponent;
