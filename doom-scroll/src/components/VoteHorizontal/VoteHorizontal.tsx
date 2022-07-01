import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {
    score: number;
};

const VoteHorizontal: FC<Props> = ({ score }) => {
    return (
        <div className="inline-block flex-shrink-0 flex-grow-0 p-1 text-amber-100">
            <div className="inline-block">
                <FontAwesomeIcon icon={solid("chevron-up")} size="sm" />
            </div>
            <p className="mx-2 inline-block text-center text-sm font-bold">
                {score}
            </p>
            <div className="inline-block">
                <FontAwesomeIcon icon={solid("chevron-down")} size="sm" />
            </div>
        </div>
    );
};

export default VoteHorizontal;
