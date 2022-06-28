import { selectAccessToken } from "features/auth/authSlice";
import RedditApi from "lib/reddit/redditApi";
import { getElapsedString } from "lib/utils/getElapsedString";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Author = ({ author, created }: { author: string; created: number }) => {
    const accessToken = useSelector(selectAccessToken);
    const [profileImg, setProfileImg] = useState(null);

    useEffect(() => {
        if (accessToken !== null && author !== "[deleted]") {
            RedditApi.fetchProfileImg(accessToken, author).then(
                (fetchedProfileImg) => {
                    setProfileImg(fetchedProfileImg);
                }
            );
        }
    }, [accessToken, author]);

    const elapsedString = getElapsedString(created);

    return (
        <div className="flex items-center">
            <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-6 h-6 rounded-full">
                {profileImg !== null ? (
                    <img
                        src={profileImg}
                        alt={`${author}'s profile`}
                        className="block w-full h-full"
                    />
                ) : (
                    <div className={`block w-full h-full bg-neutral-800`}></div>
                )}
            </figure>
            <div>
                <div className="inline-block ml-4">
                    <p className="inline font-bold italic">{author}</p>{" "}
                    <p className="inline font-thin">- {elapsedString}</p>
                </div>
            </div>
        </div>
    );
};

export default Author;
