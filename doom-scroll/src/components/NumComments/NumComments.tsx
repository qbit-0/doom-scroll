import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {
    num_comments: number;
};

const NumComments: FC<Props> = ({ num_comments }) => {
    return (
        <div className="inline-block flex-shrink-0 flex-grow-0 p-1 text-amber-100">
            <div className="inline-block mx-1">
                <FontAwesomeIcon icon={solid("comments")} size="sm" />
            </div>
            <p className="inline-block mx-2 text-sm text-center font-bold">
                {num_comments}
            </p>
        </div>
    );
};

export default NumComments;
