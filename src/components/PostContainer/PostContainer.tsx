import {
    selectNlpFilterMaxRatio,
    selectNlpFilterMaxSentiment,
    selectNlpFilterMinRatio,
    selectNlpFilterMinSentiment,
} from "features/nlpFilter/nlpFilterSlice";
import { PostData } from "lib/reddit/redditData";
import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";

import Post from "components/Post/Post";

type Props = {
    post: PostData;
};

const PostContainer: FC<Props> = ({ post }) => {
    const minSentiment = useSelector(selectNlpFilterMinSentiment);
    const maxSentiment = useSelector(selectNlpFilterMaxSentiment);
    const minRatio = useSelector(selectNlpFilterMinRatio);
    const maxRatio = useSelector(selectNlpFilterMaxRatio);

    if (
        post.meta.sentiment < minSentiment ||
        post.meta.sentiment > maxSentiment ||
        post.data["upvote_ratio"] < minRatio ||
        post.data["upvote_ratio"] > maxRatio
    ) {
        return null;
    }

    return <Post post={post} />;
};

export default PostContainer;
