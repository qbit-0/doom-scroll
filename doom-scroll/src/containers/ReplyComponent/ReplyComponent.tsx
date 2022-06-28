import CommentAndReplies from "containers/CommentAndReplies/CommentAndReplies";
import MoreComponent from "containers/MoreComponent/MoreComponent";
import { CommentData, MoreData, ReplyData } from "lib/reddit/redditData";
import React from "react";

type Props = {
    reply: ReplyData;
};

const ReplyComponent: React.FC<Props> = ({ reply }) => {
    if (reply.kind === "comment") {
        const comment: CommentData = reply as CommentData;
        return <CommentAndReplies comment={comment} />;
    } else {
        const more: MoreData = reply as MoreData;
        return <MoreComponent more={more} />;
    }
};

export default ReplyComponent;
