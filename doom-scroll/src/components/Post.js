import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  let author = post.data.author;

  let preview;
  if (post.data.preview !== undefined) {
    preview = post.data.preview.images[0].source.url;
  }

  let selftext;
  if (post.data.selftext !== undefined) {
    selftext = <p>{post.data.selftext}</p>;
  }

  return (
    <div className="p-4 mt-4 border-4 border-solid border-blue-600">
      <Link to={`/${post.data.subreddit_name_prefixed}`}>
        <h4>{post.data.subreddit_name_prefixed}</h4>
        <p>Posted by {author}</p>
      </Link>
      <Link to={`${post.data.permalink}`}>
        <h3>{post.data.title}</h3>
      </Link>
      <figure className="inline-block w-full overflow-hidden">
        <img src={preview} className="min-w-full min-h-full" />
      </figure>
      <p>Votes: {post.data.ups}</p>
      {selftext}
    </div>
  );
};
