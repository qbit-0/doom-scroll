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
    if (sentiment === null || Number.isNaN(sentiment)) {
        return (
            <div
                className={`inline-block w-28 flex-shrink-0 py-4 rounded-br-3xl bg-neutral-600 shadow-xl`}
            ></div>
        );
    }

    const roundedSentiment = Math.round(sentiment * 100) / 100;

    let fromColor = "bg-neutral-600";
    if (roundedSentiment < 0) {
        fromColor = "bg-rose-600";
    } else if (roundedSentiment > 0) {
        fromColor = "bg-sky-600";
    }

    let roundedCommentSentiment = null;
    if (commentSentiment !== undefined) {
        roundedCommentSentiment = Math.round(commentSentiment * 100) / 100;
    }

    return (
        <div
            className={`inline-block w-28 flex-shrink-0 py-4 ${fromColor} shadow-xl`}
        >
            <div className="mb-4">
                <h4 className="text-center font-bold"> Sentiment</h4>
                <p className="text-center"> {roundedSentiment}</p>
            </div>

            {roundedCommentSentiment !== null && (
                <div className="mb-4">
                    <h4 className="text-center font-bold">
                        Comments Sentiment
                    </h4>
                    <p className="text-center"> {roundedCommentSentiment}</p>
                </div>
            )}

            {ratio !== undefined && (
                <div>
                    <h4 className="text-center font-bold">Upvote Ratio</h4>
                    <p className="text-center"> {ratio}</p>
                </div>
            )}
        </div>
    );
};

export default SentimentBanner;
