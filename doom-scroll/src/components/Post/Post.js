import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
  selectMaxRatio, selectMaxSentiment,
  selectMinRatio, selectMinSentiment
} from "../../features/nlp/nlpSlice";
import { getElapsedString } from "../../utility/getElapsedString";
import { fetchReddit } from "../../utility/redditAPI";
import { SentimentBanner } from "../SentimentBanner/SentimentBanner";

export const Post = ({ post, nlp }) => {
  const accessToken = useSelector(selectAccessToken);
  const minScore = useSelector(selectMinSentiment);
  const maxScore = useSelector(selectMaxSentiment);
  const minRatio = useSelector(selectMinRatio);
  const maxRatio = useSelector(selectMaxRatio);

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

  const url = post.data.url_overridden_by_dest;

  let selftext = null;
  if (post.data.selftext !== undefined) {
    selftext = post.data.selftext;
  }

  const upvotes = post.data.ups;

  useEffect(() => {
    if (author !== "[deleted]") {
      fetchReddit({
        accessToken: accessToken,
        pathname: `/user/${author}/about`,
        search: "",
      }).then((jsonResponse) => {
        setProfileImg(jsonResponse.data.icon_img);
      });
    }
  }, [accessToken]);

  const sentiment = post.score;
  const ratio = post.data.upvote_ratio;
  if (
    sentiment < minScore ||
    sentiment > maxScore ||
    ratio < minRatio ||
    ratio > maxRatio
  ) {
    return;
  }

  return (
    <section className="flex overflow-clip mx-auto mb-8 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      <SentimentBanner sentiment={sentiment} ratio={ratio} />

      <div className="flex-grow-0 w-full p-8">
        <Link to={`/${post.data.subreddit_name_prefixed}`}>
          <p className="underline">{post.data.subreddit_name_prefixed}</p>
        </Link>

        <div className="flex items-center mt-4">
          <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-12 h-12 rounded-full">
            <img src={profileImg} className="block w-full h-full" />
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
          <a href={url} target="_blank">
            <figure className="max-w-2xl max-h-96 mt-4 mx-auto rounded-2xl overflow-clip">
              <img src={preview} className="block w-full h-full" />
            </figure>
          </a>
        )}

        {selftext !== null && (
          <div>
            <p>{selftext}</p>
          </div>
        )}

        <div>
          <p className="mt-4">Votes: {upvotes}</p>
        </div>
      </div>
    </section>
  );
};
