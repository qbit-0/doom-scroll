import Post from "components/Post/Post";
import {
    selectMaxRatio,
    selectMaxSentiment,
    selectMinRatio,
    selectMinSentiment,
} from "features/nlp/nlpSlice";
import { PostData } from "lib/reddit/redditData";
import React from "react";
import { useSelector } from "react-redux";

type Props = { post: PostData };

const PostContainer: React.FC<Props> = ({ post }) => {
    const minScore = useSelector(selectMinSentiment);
    const maxScore = useSelector(selectMaxSentiment);
    const minRatio = useSelector(selectMinRatio);
    const maxRatio = useSelector(selectMaxRatio);

    if (
        post.meta.sentiment < minScore ||
        post.meta.sentiment > maxScore ||
        post.data["ratio"] < minRatio ||
        post.data["ratio"] > maxRatio
    ) {
        return null;
    }

    return <Post post={post} />;
};

export default PostContainer;
