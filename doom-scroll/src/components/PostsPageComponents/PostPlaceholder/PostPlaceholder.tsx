import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import SentimentBanner from "../../SharedComponents/SentimentBanner/SentimentBanner";

const PostPlaceholder = () => {
  return (
    <section className="flex overflow-hidden h-96 mx-auto mb-8 border-t-2 border-l-2 border-zinc-700 rounded-tl-3xl bg-gradient-to-r from-zinc-800 shadow-md">
      <SentimentBanner sentiment={null} />
      <div className="flex w-full h-full flex-col justify-center items-center text-zinc-700">
        <FontAwesomeIcon icon={solid("frog")} size="10x" bounce />
      </div>
    </section>
  );
};

export default PostPlaceholder;
