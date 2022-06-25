import React from "react";
import { WinkMethods } from "wink-nlp";
import { Comment, Reply, ReplyRoot } from "../../reddit/redditDataStructures";
import CommentComponent from "../CommentComponent/CommentComponent";
import MoreComponent from "../MoreComponent/MoreComponent";
import SentimentBanner from "../SentimentBanner/SentimentBanner";
type Props = {
  replyRoot: ReplyRoot;
  nlp: WinkMethods;
};

const ReplyTree: React.FC<Props> = ({ replyRoot, nlp }) => {
  return (
    <section>
      {replyRoot.replies.map((reply: Reply, index: number) => {
        if ("replyIds" in reply) {
          return <MoreComponent more={reply} nlp={nlp} key={index} />;
        }
        return <CommentComponent comment={reply} nlp={nlp} key={index} />;
      })}
    </section>
  );
};

export default ReplyTree;
