import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../features/auth/authSlice";
import { fetchReddit } from "../utility/redditAPI";

export const Comment = ({ comment }) => {
  const accessToken = useSelector(selectAccessToken);
  const [profileImg, setProfileImg] = useState(null);

  const author = comment.data.author;
  useEffect(() => {
    fetchReddit({
      accessToken: accessToken,
      pathname: `/user/${author}/about`,
      search: "",
    }).then((jsonResponse) => {
      setProfileImg(jsonResponse.data.icon_img);
    });
  }, [accessToken]);

  const created = comment.data.created_utc;
  const body = comment.data.body;
  const upvotes = comment.data.ups;

  return (
    <div className="flex overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="inline-block w-24 flex-shrink-0 border-b-2 border-amber-100 bg-gradient-to-b from-sky-600 to-gray-800"></div>
      <div className="inline-block p-8">
        <div>
          <div className="flex items-center">
            <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-12 h-12 rounded-full">
              <img src={profileImg} className="block w-full h-auto" />
            </figure>
            <div>
              <p className="inline-block ml-4">
                <span className="font-bold italic">{author}</span> - Posed {created}{" "}
                ago
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
