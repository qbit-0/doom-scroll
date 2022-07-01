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
        <div className="flex justify-center items-center h-screen bg-neutral-900">
            <div>
                <h2 className="text-center text-amber-100 font-black text-8xl">
                    No Route Match
                </h2>
                <div className="flex flex-col w-full h-full p-8 justify-center items-center text-neutral-700">
                    <FontAwesomeIcon
                        icon={solid("signs-post")}
                        size="10x"
                        bounce
                    />
                </div>
                <p className="text-center text-amber-100 font-black text-3xl">
                    Let's go{" "}
                    <Button
                        borderColor="border-purple-700"
                        onClick={() => navigate("/r/popular")}
                    >
                        back?
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default NoMatch;
