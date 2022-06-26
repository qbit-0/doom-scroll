import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../features/auth/authSlice";
import { getElapsedString } from "../../../utils/getElapsedString";
import { fetchProfileImg } from "../../../reddit/redditApi";

const Author = ({ author, created }: { author: string; created: number }) => {
    const accessToken = useSelector(selectAccessToken);
    const [profileImg, setProfileImg] = useState(null);

    useEffect(() => {
        if (accessToken !== null && author !== "[deleted]") {
            fetchProfileImg(accessToken, author).then((fetchedProfileImg) => {
                setProfileImg(fetchedProfileImg);
            });
        }
    }, [accessToken, author]);

    const elapsedString = getElapsedString(created);

    return (
        <div className="flex items-center">
            <figure className="inline-block flex-grow-0 flex-shrink-0 overflow-clip w-6 h-6 rounded-full">
                {profileImg && (
                    <img
                        src={profileImg}
                        alt={`${author}'s profile`}
                        className="block w-full h-full"
                    />
                )}
                {!profileImg && (
                    <div className="block w-full h-full bg-zinc-800 "></div>
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
