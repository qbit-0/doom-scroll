import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  let thumbail;
  if (
    post.data.thumbnail !== undefined &&
    post.data.thumbnail !== "default" &&
    post.data.thumbail !== "self"
  ) {
    thumbail = <img src={post.data.thumbnail} />;
  }

  let selftext;
  if (post.data.selftext !== undefined) {
    selftext = <p>{post.data.selftext}</p>;
  }

  return (
    <div className="p-4 m-4 border-4 border-solid border-blue-600 rounded-lg">
      <Link to={`/${post.data.subreddit_name_prefixed}`}>
        <h4>{post.data.subreddit_name_prefixed}</h4>
      </Link>
      <Link to={`${post.data.permalink}`}>
        <h3>{post.data.title}</h3>
        <p>Votes: {post.data.ups}</p>
        {thumbail}
        {selftext}
      </Link>
    </div>
  );
};
