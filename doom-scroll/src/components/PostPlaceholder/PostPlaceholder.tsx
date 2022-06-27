import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import VoteVertical from "components/VoteVertical/VoteVertical";
import React from "react";

const PostPlaceholder = () => {
    return (
        <article className="flex overflow-clip h-[50rem] mx-auto border-t-2 border-l-2 border-zinc-700 rounded-tl-3xl rounded-br-3xl bg-gradient-to-r from-zinc-800 shadow-xl">
            <VoteVertical />

            <div className="flex-grow-0 w-full">
                <div className="flex w-full h-full flex-col justify-center items-center text-zinc-700">
                    <FontAwesomeIcon icon={solid("frog")} size="10x" bounce />
                </div>
            </div>
            <SentimentBanner sentiment={null} />
        </article>
    );
};

export default PostPlaceholder;
