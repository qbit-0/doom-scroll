import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {};

const PostPlaceholder: FC<Props> = () => {
    return (
        <article className="overflow-clip h-[20rem] mx-auto border-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-900 drop-shadow-lg animation-pulse">
            <div className="flex justify-center items-end w-full h-full text-neutral-700">
                <FontAwesomeIcon icon={solid("frog")} size="10x" bounce />
            </div>
        </article>
    );
};

export default PostPlaceholder;
