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
        <div className="flex h-full flex-auto items-center justify-start gap-2 overflow-hidden">
            <figure className="inline-block h-8 w-8 shrink-0 grow-0 overflow-clip rounded-full">
                {profileImg !== null ? (
                    <img
                        src={profileImg}
                        alt={`${author}'s profile`}
                        className="block h-full w-full"
                    />
                ) : (
                    <div className="block h-full w-full bg-neutral-800"></div>
                )}
            </figure>

            <div className="flex-auto flex-wrap overflow-hidden">
                <p className="overflow-hidden overflow-ellipsis text-sm font-bold italic text-amber-100">
                    {author}
                </p>

                <p className="text-sm font-thin text-amber-100">
                    &nbsp; - {elapsedString}
                </p>
            </div>
        </div>
    );
};

export default Author;
