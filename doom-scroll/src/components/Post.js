import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAccessToken } from "../features/auth/authSlice";
import { fetchReddit } from "../utility/redditAPI";

export const Post = ({ post }) => {
  const accessToken = useSelector(selectAccessToken);
  const [profileImg, setProfileImg] = useState(null);

  const author = post.data.author;
  useEffect(() => {
    fetchReddit({
      accessToken: accessToken,
      pathname: `/user/${author}/about`,
      search: "",
    }).then((jsonResponse) => {
      setProfileImg(jsonResponse.data.icon_img);
    });
  }, [accessToken]);

  const created = post.data.created_utc;

  let preview = null;
  if (post.data.preview !== undefined) {
    preview = post.data.preview.images[0].source.url;
  }

  let selftext = null;
  if (post.data.selftext !== undefined) {
    selftext = <p>{post.data.selftext}</p>;
  }

  const upvotes = post.data.ups;

  return (
    <section className="flex overflow-hidden max-w-7xl mx-auto mb-8 border-t-2 border-l-2 border-amber-100 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="inline-block w-24 flex-shrink-0 border-b-2 border-amber-100 bg-gradient-to-b from-rose-600 to-gray-800"></div>
      <div className="flex-grow-0 inline-block w-full p-8">
        <Link to={`/${post.data.subreddit_name_prefixed}`}>
          <p className="underline">{post.data.subreddit_name_prefixed}</p>
        </Link>
        <div className="flex items-center mt-8">
          <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-12 h-12 rounded-full">
            <img src={profileImg} className="block w-full h-auto" />
          </figure>
          <div>
            <p className="inline-block ml-4">
              <span className="font-bold italic">{author}</span> - Posed{" "}
              {created} ago
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link to={`${post.data.permalink}`}>
            <h3 className="text-3xl font-bold">{post.data.title}</h3>
          </Link>
        </div>
        {preview !== null && (
          <figure className="inline-block w-full max-h-96 rounded-xl overflow-hidden">
            <img src={preview} className="block min-w-full h-auto" />
          </figure>
        )}
        <p>Votes: {upvotes}</p>
        {selftext !== null && <p>{selftext}</p>}
      </div>
    </section>
  );
};
