import CommentAndReplies from "components/CommentAndReplies";
import More from "components/More";
import { CommentData, MoreData, ReplyData } from "lib/reddit/redditData";
import React from "react";

type Props = {
    reply: ReplyData;
};

const Reply: React.FC<Props> = ({ reply }) => {
    if (reply.kind === "comment") {
        const comment: CommentData = reply as CommentData;
        return <CommentAndReplies comment={comment} />;
    } else {
        const more: MoreData = reply as MoreData;
        return <More more={more} />;
    }
};

export default Reply;
