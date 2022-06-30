import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
    score: number;
};

const VoteVertical: React.FC<Props> = ({ score }) => {
    return (
        <div className="inline-block text-amber-100">
            <div className="w-fit mx-auto">
                <FontAwesomeIcon icon={solid("chevron-up")} size="sm" />
            </div>
            <p className="text-center font-bold text-sm">{score}</p>
            <div className="w-fit mx-auto">
                <FontAwesomeIcon icon={solid("chevron-down")} size="sm" />
            </div>
        </div>
    );
};

export default VoteVertical;
