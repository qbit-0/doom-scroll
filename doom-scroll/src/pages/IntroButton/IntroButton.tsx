import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button/Button";
import React, { FC } from "react";

type Props = {
    onClick: () => void;
};

const IntroButton: FC<Props> = ({ onClick }) => {
    return (
        <footer className="flex w-full items-center justify-center bg-neutral-800 p-2 text-neutral-50 drop-shadow-lg">
            <div className="inline-block w-fit animate-pulse">
                <Button onClick={onClick}>
                    <FontAwesomeIcon icon={solid("chevron-up")} size="sm" />
                    <p className="ml-2 inline-block">Intro</p>
                </Button>
            </div>
        </footer>
    );
};

export default IntroButton;
