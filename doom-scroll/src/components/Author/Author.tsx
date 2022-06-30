import { getElapsedString } from "lib/utils/getElapsedString";
import React, { FC } from "react";

type Props = {
    author: string;
    profileImg: string | null;
    createdUtc: number;
};
const Author: FC<Props> = ({ author, profileImg, createdUtc }) => {
    const elapsedString = getElapsedString(createdUtc);

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
                <div className="inline-block ml-4 text-amber-100 text-sm">
                    <p className="inline font-bold italic">{author}</p>{" "}
                    <p className="inline font-thin ">- {elapsedString}</p>
                </div>
            </div>
        </div>
    );
};

export default Author;
