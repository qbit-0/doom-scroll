import CommentAndReplies from "components/CommentAndReplies/CommentAndReplies";
import MoreComponent from "components/MoreComponent/MoreComponent";
import { Comment, More, Reply } from "lib/reddit/redditData";
import React from "react";

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
