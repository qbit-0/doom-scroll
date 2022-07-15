import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {};

const PostPlaceholder: FC<Props> = () => {
    return (
        <article className="animation-pulse mx-auto h-[40rem] overflow-clip rounded-tl-3xl rounded-br-3xl border-2 border-neutral-700 bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg">
            <div className="flex h-full w-full items-end justify-center text-neutral-700">
                <FontAwesomeIcon icon={solid("frog")} size="10x" bounce />
            </div>
        </article>
    );
};

export default PostPlaceholder;
