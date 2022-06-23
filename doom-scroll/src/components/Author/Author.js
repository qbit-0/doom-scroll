import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../features/auth/authSlice";
import { getElapsedString } from "../../utils/getElapsedString";
import { fetchProfileImg } from "../../utils/redditAPI";

const Author = ({ author, created }) => {
  const accessToken = useSelector(selectAccessToken);
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    if (accessToken !== null && author !== "[deleted]") {
      fetchProfileImg(accessToken, author).then((fetchedProfileImg) => {
        setProfileImg(fetchedProfileImg);
      });
    }
  }, [accessToken]);

  const elapsedString = getElapsedString(created);

  return (
    <div className="flex items-center">
      <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-12 h-12 rounded-full">
        {profileImg && (
          <img
            src={profileImg}
            alt={`${author}'s profile picture.`}
            className="block w-full h-full"
          />
        )}
        {!profileImg && (
          <div className="block w-full h-full bg-gray-800 "></div>
        )}
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

export default Author;
