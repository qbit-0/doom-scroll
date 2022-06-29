import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import React, { FC } from "react";

type Props = {};

const PostPlaceholder: FC<Props> = (props) => {
    return (
        <article className="flex overflow-clip h-[30rem] mx-auto border-t-2 border-l-2 border-neutral-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-neutral-800 to-neutral-900 shadow-lg">
            <div className="flex-grow-0 w-full">
                <div className="flex flex-col w-full h-full p-8 justify-center items-center text-neutral-700">
                    <FontAwesomeIcon icon={solid("frog")} size="10x" bounce />
                </div>
            </div>
            <SentimentBanner sentiment={null} />
        </article>
    );
};

export default PostPlaceholder;
