import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsReplyTree } from "../../features/comments/commentsSlice";
import { replyTreeFind } from "../../reddit/redditDataUtils";
import CommentComponent from "../CommentComponent/CommentComponent";
import MoreComponent from "../MoreComponent/MoreComponent";

type Props = {
    id: number;
};

const ReplyComponent: React.FC<Props> = ({ id }) => {
    const replyTree = useSelector(selectCommentsReplyTree);
    const reply = replyTreeFind(replyTree, id);

    if ("children" in reply) {
        return <CommentComponent id={id} />;
    }
    return <MoreComponent id={id} />;
};

export default ReplyComponent;
