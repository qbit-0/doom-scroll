import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  score: number;
};

const Vote: React.FC<Props> = ({ score }) => {
  return (
    <div className="inline-block py-4 px-4 flex-shrink-0 flex-grow-0 shadow-md">
      <div className="w-fit mx-auto">
        <FontAwesomeIcon icon={solid("chevron-up")} size="lg" />
      </div>
      <p className="text-center font-bold">{score}</p>
      <div className="w-fit mx-auto">
        <FontAwesomeIcon icon={solid("chevron-down")} size="lg" />
      </div>
    </div>
  );
};

export default Vote;
