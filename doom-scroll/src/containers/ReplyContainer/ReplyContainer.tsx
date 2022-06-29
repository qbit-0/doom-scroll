import CommentAndRepliesContainer from "containers/CommentAndRepliesContainer/CommentAndRepliesContainer";
import MoreComponentContainer from "containers/MoreComponentContainer/MoreComponentContainer";
import { CommentData, MoreData, ReplyData } from "lib/reddit/redditData";
import React from "react";

type Props = {
    reply: ReplyData;
};

const ReplyContainer: React.FC<Props> = ({ reply }) => {
    if (reply.kind === "comment") {
        const comment: CommentData = reply as CommentData;
        return <CommentAndRepliesContainer comment={comment} />;
    } else {
        const more: MoreData = reply as MoreData;
        return <MoreComponentContainer more={more} />;
    }
};

export default ReplyContainer;
