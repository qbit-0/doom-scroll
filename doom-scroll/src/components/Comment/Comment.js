import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../features/auth/authSlice";
import { fetchReddit } from "../../utility/redditAPI";
import { SentimentBanner } from "../SentimentBanner/SentimentBanner";

export const Comment = ({ comment, nlp }) => {
  const accessToken = useSelector(selectAccessToken);
  const [profileImg, setProfileImg] = useState(null);

  const author = comment.data.author;
  const created = comment.data.created_utc;
  const body = comment.data.body;
  const upvotes = comment.data.score;

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

  const sentiment = comment.score;

  return (
    <div className="flex overflow-hidden border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      <SentimentBanner sentiment={sentiment} />

      <div className="inline-block p-8">
        <div>
          <div className="flex items-center">
            <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-12 h-12 rounded-full">
              <img src={profileImg} className="block w-full h-auto" />
            </figure>
            <div>
              <p className="inline-block ml-4">
                <span className="font-bold italic">{author}</span> - {created}
              </p>
            </div>
          </div>
          <p className="mt-4">{body}</p>
          <p>Votes: {upvotes}</p>
        </div>
      </div>
    </div>
  );
};
