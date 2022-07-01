import Button from "components/Button/Button";
import MainSearchBar from "components/MainSearchBar/MainSearchBar";
import React, { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type InnerProps = {
    navBarPaths: {
        [path: string]: string;
    };
};
export const NavBar: FC<InnerProps> = ({ navBarPaths }) => {
    const navigate = useNavigate();

    const handleNavClick = (path: string) => {
        return (event: MouseEvent<HTMLButtonElement>) => {
            navigate(`${path}`);
        };
    };

    return (
        <div className="w-fit mx-auto">
            <div className="flex justify-center my-2">
                {Object.entries(navBarPaths).map((entry, index) => (
                    <div className="inline-block mx-1" key={index}>
                        <Button onClick={handleNavClick(entry[0])}>
                            <p className="inline font-bold">{entry[1]}</p>
                        </Button>
                    </div>
                ))}
            </div>

            <div className="my-2">
                <MainSearchBar />
            </div>
        </div>
    );
};
