import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button";

type Props = {};

const NoMatch: FC<Props> = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen items-center justify-center bg-neutral-900">
            <div>
                <h2 className="text-center text-8xl font-black text-neutral-50">
                    No Route Match
                </h2>
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-neutral-700">
                    <FontAwesomeIcon
                        icon={solid("signs-post")}
                        size="10x"
                        bounce
                    />
                </div>
                <p className="text-center text-3xl font-black text-neutral-50">
                    Let's go{" "}
                    <Button
                        borderColor="border-purple-700"
                        onClick={() => navigate("/r/popular")}
                    >
                        home?
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default NoMatch;
