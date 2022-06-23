import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../features/auth/authSlice";
import { getElapsedString } from "../../utility/getElapsedString";
import { fetchReddit } from "../../utility/redditAPI";

export const Author = ({ author, created }) => {
  const accessToken = useSelector(selectAccessToken);
  const [profileImg, setProfileImg] = useState(null);

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

  const elapsedString = getElapsedString(created);

  return (
    <div className="flex items-center">
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
  );
};
