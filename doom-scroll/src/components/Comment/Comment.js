import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../features/auth/authSlice";
import { fetchReddit } from "../../utility/redditAPI";
import { Author } from "../Author/Author";
import { SentimentBanner } from "../SentimentBanner/SentimentBanner";

export const Comment = ({ comment, nlp }) => {
  const [profileImg, setProfileImg] = useState(null);

  const author = comment.data.author;
  const created = comment.data.created_utc;
  const body = comment.data.body;
  const upvotes = comment.data.score;

  const sentiment = comment.score;

  return (
    <div className="flex overflow-hidden border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      <SentimentBanner sentiment={sentiment} />

      <div className="inline-block p-8">
        <div>
          <Author author={author} created={created} />
          <p className="mt-4">{body}</p>
          <p>Score: {upvotes}</p>
        </div>
      </div>
    </div>
  );
};
