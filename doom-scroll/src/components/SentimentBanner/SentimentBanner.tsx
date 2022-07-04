import React from "react";

type Props = {
    sentiment: number;
    ratio?: number;
};

const SentimentBanner: React.FC<Props> = ({ sentiment, ratio }) => {
    const roundedSentiment = Math.round(sentiment * 100) / 100;

    let fromColor = "bg-neutral-700";
    if (roundedSentiment < 0) {
        fromColor = "bg-rose-700";
    } else if (roundedSentiment > 0) {
        fromColor = "bg-cyan-700";
    }

    return (
        <div
            className={`inline-flex flex-auto shrink-0 justify-center gap-2 p-2 text-neutral-50 drop-shadow-lg ${fromColor}`}
        >
            <div className="inline-block flex-auto text-xs sm:text-base">
                <h4 className="text-center font-bold"> Sentiment</h4>
                <p className="text-center"> {roundedSentiment}</p>
            </div>

            {ratio !== undefined && (
                <div className="inline-block flex-auto text-xs sm:text-base">
                    <h4 className="text-center font-bold">Upvote Ratio</h4>
                    <p className="text-center"> {ratio}</p>
                </div>
            )}
        </div>
    );
};

export default SentimentBanner;
