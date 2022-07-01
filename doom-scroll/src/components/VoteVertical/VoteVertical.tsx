import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {
    score: number;
};

const VoteVertical: FC<Props> = ({ score }) => {
    return (
        <div className="inline-block text-amber-100">
            <div className="mx-auto w-fit">
                <FontAwesomeIcon icon={solid("chevron-up")} size="sm" />
            </div>
            <p className="text-center text-sm font-bold">{score}</p>
            <div className="mx-auto w-fit">
                <FontAwesomeIcon icon={solid("chevron-down")} size="sm" />
            </div>
        </div>
    );
};

export default VoteVertical;
