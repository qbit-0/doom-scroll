import React from "react";
import { Comment, More, Reply } from "../../../reddit/redditData";
import CommentAndReplies from "../CommentAndReplies/CommentAndReplies";
import MoreComponent from "../MoreComponent/MoreComponent";

type Props = {
    reply: Reply;
};

const ReplyComponent: React.FC<Props> = ({ reply }) => {
    if (reply.kind === "comment") {
        const comment: Comment = reply as Comment;
        return <CommentAndReplies comment={comment} />;
    } else {
        const more: More = reply as More;
        return <MoreComponent more={more} />;
    }
};

export default ReplyComponent;
