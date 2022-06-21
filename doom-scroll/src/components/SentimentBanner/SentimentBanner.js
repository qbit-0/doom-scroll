export const SentimentBanner = ({ score }) => {
  if (score === null) {
    return (
      <div
        className={`inline-block w-20 flex-shrink-0 p-4 bg-gradient-to-b from-gray-600 to-gray-800`}
      ></div>
    );
  }

  const roundedScore = Math.round(score * 100) / 100;

  let fromColor = "from-gray-600";
  if (roundedScore < 0) {
    fromColor = "from-rose-600";
  } else if (roundedScore > 0) {
    fromColor = "from-sky-600";
  }

  return (
    <div
      className={`inline-block w-20 flex-shrink-0 pt-8 px-4 bg-gradient-to-b ${fromColor} to-gray-800`}
    >
      <div>
        <h4 className="text-center font-bold">Score</h4>
        <p className="text-center"> {roundedScore}</p>
      </div>
    </div>
  );
};
