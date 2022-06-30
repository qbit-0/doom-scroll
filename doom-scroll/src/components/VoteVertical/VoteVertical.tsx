import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
    score: number;
};

const VoteVertical: React.FC<Props> = ({ score }) => {
    return (
        <div className="inline-block text-amber-100">
            <div className="p-1 bg-neutral-700 rounded-3xl">
                <div className="w-fit mx-auto">
                    <FontAwesomeIcon icon={solid("chevron-up")} size="1x" />
                </div>
                <p className="text-center font-bold text-sm">{score}</p>
                <div className="w-fit mx-auto">
                    <FontAwesomeIcon icon={solid("chevron-down")} size="1x" />
                </div>
            </div>
        </div>
    );
};

export default VoteVertical;
