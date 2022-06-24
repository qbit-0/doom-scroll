import React from "react";
import { useState } from "react";
import Author from "../Author/Author";
import SentimentBanner from "../SentimentBanner/SentimentBanner";
import Vote from "../Vote/Vote";

type Props = {
  comment: any; //TODO
}

const Comment: React.FC<Props> = ({ comment }) => {
  const author = comment.data.author;
  const created = comment.data.created_utc;
  const body = comment.data.body;
  const upvotes = comment.data.score;

  const sentiment = comment.sentiment;

  return (
    <div className="flex overflow-hidden border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
      <SentimentBanner sentiment={sentiment} />

      <Vote score={upvotes} />

      <div className="inline-block py-8">
        <div className="inline-block">
          <Author author={author} created={created} />
          <p className="mt-2">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
