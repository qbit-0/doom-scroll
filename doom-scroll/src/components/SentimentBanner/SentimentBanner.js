export const SentimentBanner = ({ sentiment, ratio }) => {
  if (
    sentiment === null ||
    sentiment === undefined ||
    Number.isNaN(sentiment)
  ) {
    return (
      <div
        className={`inline-block w-20 flex-shrink-0 p-4 bg-gradient-to-b from-gray-600 to-gray-800`}
      ></div>
    );
  }

  const roundedSentiment = Math.round(sentiment * 100) / 100;

  let fromColor = "from-gray-600";
  if (roundedSentiment < 0) {
    fromColor = "from-rose-600";
  } else if (roundedSentiment > 0) {
    fromColor = "from-sky-600";
  }

  return (
    <div
      className={`inline-block w-28 flex-shrink-0 pt-8 px-4 bg-gradient-to-b ${fromColor} to-gray-800`}
    >
      <div className="mb-4">
        <h4 className="text-center font-bold">Sentiment</h4>
        <p className="text-center"> {roundedSentiment}</p>
      </div>

      {ratio !== undefined && (
        <div>
          <h4 className="text-center font-bold">Upvote Ratio</h4>
          <p className="text-center"> {ratio}</p>
        </div>
      )}
    </div>
  );
};
