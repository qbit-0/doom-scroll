import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {
    num_comments: number;
};

const NumComments: FC<Props> = ({ num_comments }) => {
    return (
        <div className="inline-block flex-shrink-0 flex-grow-0 p-1 text-neutral-50">
            <div className="mx-1 inline-block">
                <FontAwesomeIcon icon={solid("message")} size="sm" />
            </div>
            <p className="mx-2 inline-block text-center text-sm font-bold sm:text-base">
                {num_comments}
            </p>
        </div>
    );
};

export default NumComments;
