import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
    score: number;
};

const VoteHorizontal: React.FC<Props> = ({ score }) => {
    return (
        <div className="inline-block flex-shrink-0 flex-grow-0 p-1 bg-neutral-700 rounded-3xl text-amber-100">
            <div className="inline-block mx-2">
                <FontAwesomeIcon icon={solid("chevron-up")} size="lg" />
            </div>
            <p className="inline-block mx-2 text-center font-bold">{score}</p>
            <div className="inline-block mx-2">
                <FontAwesomeIcon icon={solid("chevron-down")} size="lg" />
            </div>
        </div>
    );
};

export default VoteHorizontal;
