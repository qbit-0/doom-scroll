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
        <div className="flex h-full flex-auto justify-start items-center gap-2 overflow-hidden">
            <figure className="inline-block grow-0 shrink-0 overflow-clip w-8 h-8 rounded-full">
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

            <div className="flex-auto flex-wrap overflow-hidden">
                <p className="text-amber-100 text-sm font-bold italic overflow-hidden overflow-ellipsis">
                    {author}
                </p>

                <p className="font-thin text-sm text-amber-100">
                    &nbsp; - {elapsedString}
                </p>
            </div>
        </div>
    );
};

export default Author;
