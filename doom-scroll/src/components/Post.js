import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAccessToken } from "../features/auth/authSlice";
import { selectMaxScore, selectMinScore } from "../features/nlp/nlpSlice";
import { getElapsedString } from "../utility/getElapsedString";
import { fetchReddit } from "../utility/redditAPI";
import { SentimentBanner } from "./SentimentBanner";

export const Post = ({ post, nlp }) => {
  const accessToken = useSelector(selectAccessToken);
  const minScore = useSelector(selectMinScore);
  const maxScore = useSelector(selectMaxScore);

  const [profileImg, setProfileImg] = useState(null);

  const author = post.data.author;

  const created = post.data.created_utc;
  const elapsedString = getElapsedString(created);

  const title = post.data.title;
  const permalink = post.data.permalink;

  let preview = null;
  if (post.data.preview !== undefined) {
    preview = post.data.preview.images[0].source.url;
  }

  let selftext = null;
  if (post.data.selftext !== undefined) {
    selftext = post.data.selftext;
  }

  const upvotes = post.data.ups;

  useEffect(() => {
    fetchReddit({
      accessToken: accessToken,
      pathname: `/user/${author}/about`,
      search: "",
    }).then((jsonResponse) => {
      setProfileImg(jsonResponse.data.icon_img);
    });
  }, [accessToken]);

  const score = post.score;
  if (score < minScore || score > maxScore) {
    return;
  }

  return (
    <section className="flex overflow-hidden max-w-7xl mx-auto mb-8 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      <SentimentBanner score={score} />

      <div className="flex-grow-0 inline-block w-full p-8">
        <Link to={`/${post.data.subreddit_name_prefixed}`}>
          <p className="underline">{post.data.subreddit_name_prefixed}</p>
        </Link>

        <div className="flex items-center mt-4">
          <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-12 h-12 rounded-full">
            <img src={profileImg} className="block w-full h-auto" />
          </figure>
          <div>
            <p className="inline-block ml-4">
              <span className="font-bold italic">{author}</span>{" "}
              <span className="font-thin">- {elapsedString}</span>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Link to={`${permalink}`}>
            <h3 className="text-3xl font-bold">{title}</h3>
          </Link>
        </div>

        {preview !== null && (
          <figure className="inline-block w-full max-h-96 rounded-xl mt-4 overflow-hidden">
            <img src={preview} className="block min-w-full h-auto" />
          </figure>
        )}

        {selftext !== null && <p>{selftext}</p>}
        <p className="mt-4">Votes: {upvotes}</p>
      </div>
    </section>
  );
};
