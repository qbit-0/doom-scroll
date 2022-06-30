import React from "react";

type Props = {
    sentiment: number | null;
    commentSentiment?: number | undefined;
    ratio?: number;
};

const SentimentBanner: React.FC<Props> = ({
    sentiment,
    commentSentiment,
    ratio,
}) => {
    if (sentiment === null) {
        return (
            <div
                className={`inline-block w-28 flex-shrink-0 py-4 rounded-br-3xl bg-neutral-700 drop-shadow-lg`}
            />
        );
    }

    const roundedSentiment = Math.round(sentiment * 100) / 100;

    let fromColor = "bg-neutral-700";
    if (roundedSentiment < 0) {
        fromColor = "bg-rose-700";
    } else if (roundedSentiment > 0) {
        fromColor = "bg-cyan-700";
    }

    let roundedCommentSentiment = null;
    if (commentSentiment !== undefined) {
        roundedCommentSentiment = Math.round(commentSentiment * 100) / 100;
    }

    return (
        <div
            className={`inline-flex w-full px-2 py-2 ${fromColor} drop-shadow-lg text-amber-100`}
        >
            <div className="inline-block flex-auto mx-4 text-xs">
                <h4 className="text-center font-bold"> Sentiment</h4>
                <p className="text-center"> {roundedSentiment}</p>
            </div>

            {roundedCommentSentiment !== null && (
                <div className="inline-block flex-auto mx-4 text-xs">
                    <h4 className="text-center font-bold">
                        Comments Sentiment
                    </h4>
                    <p className="text-center"> {roundedCommentSentiment}</p>
                </div>
            )}

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
