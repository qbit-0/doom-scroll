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
    <div
      className="post"
      style={{ margin: "2rem", border: "0.25rem solid blue" }}
    >
      <h3>{post.data.title}</h3>
      <Link to={`/${post.data.subreddit_name_prefixed}`}>
        <h4>{post.data.subreddit_name_prefixed}</h4>
      </Link>
      <p>Votes: {post.data.ups}</p>
      {thumbail}
      {selftext}
    </div>
  );
};
