import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectMaxRatio,
  selectMaxSentiment,
  selectMinRatio,
  selectMinSentiment,
} from "../../features/nlp/nlpSlice";
import Author from "../Author/Author";
import SentimentBanner from "../SentimentBanner/SentimentBanner";
import Vote from "../Vote/Vote";

const Post = ({ post, nlp }) => {
  const minScore = useSelector(selectMinSentiment);
  const maxScore = useSelector(selectMaxSentiment);
  const minRatio = useSelector(selectMinRatio);
  const maxRatio = useSelector(selectMaxRatio);

  const author = post.data.author;

  const created = post.data.created_utc;

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
    <section className="flex overflow-clip mx-auto mb-8 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
      <SentimentBanner sentiment={sentiment} ratio={ratio} />

      <Vote score={upvotes} />

      <div className="flex-grow-0 w-full py-8">
        <Link to={`/${post.data.subreddit_name_prefixed}`}>
          <p className="underline">{post.data.subreddit_name_prefixed}</p>
        </Link>

        <div className="mt-4">
          <Author author={author} created={created} />
        </div>

        <div className="mt-4">
          <Link to={`${permalink}`}>
            <h3 className="text-3xl font-bold">{title}</h3>
          </Link>
        </div>

        {preview !== null && (
          <a href={url} target="_blank">
            <figure className="max-w-2xl max-h-96 mt-4 mx-auto rounded-2xl overflow-clip shadow-md">
              <img src={preview} className="block w-full h-full" />
            </figure>
          </a>
        )}

        {selftext !== null && (
          <div>
            <p>{selftext}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Post;
