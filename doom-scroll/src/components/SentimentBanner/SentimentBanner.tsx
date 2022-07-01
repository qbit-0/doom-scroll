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
            className={`inline-flex w-full px-2 py-2 ${fromColor} drop-shadow-lg text-amber-100`}
        >
            <div className="inline-block flex-auto mx-4 text-xs">
                <h4 className="text-center font-bold"> Sentiment</h4>
                <p className="text-center"> {roundedSentiment}</p>
            </div>

            {ratio !== undefined && (
                <div className="inline-block flex-auto mx-4 text-xs">
                    <h4 className="text-center font-bold">Upvote Ratio</h4>
                    <p className="text-center"> {ratio}</p>
                </div>
            )}
        </div>
    );
};

export default SentimentBanner;
