import React from "react";
import { WinkMethods } from "wink-nlp";
import { Comment, Reply } from "../../reddit/redditDataStructures";
import Author from "../Author/Author";
import MoreComponent from "../MoreComponent/MoreComponent";
import SentimentBanner from "../SentimentBanner/SentimentBanner";
import Vote from "../Vote/Vote";

type Props = {
  comment: Comment;
  nlp: WinkMethods;
};

const CommentComponent: React.FC<Props> = ({ comment, nlp }) => {
  const author = comment.data.author;
  const created = comment.data.created;
  const body = comment.data.body;
  const upvotes = comment.data.score;

  const sentiment =
    comment.meta.sentiment !== undefined ? comment.meta.sentiment : 0;

  return (
    <div>
      <div className="flex overflow-hidden mb-4 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
        <SentimentBanner sentiment={sentiment} />
        <Vote score={upvotes} />
        <div className="inline-block py-8">
          <div className="inline-block">
            <Author author={author} created={created} />
            <p className="mt-2">{body}</p>
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="pl-4 my-4 border-l-2 border-amber-100">
          {comment.replies.map((reply: Reply, index: number) => {
            if ("replyIds" in reply) {
              return <MoreComponent more={reply} nlp={nlp} key={index} />;
            }
            return <CommentComponent comment={reply} nlp={nlp} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
