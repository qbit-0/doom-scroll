import Button from "components/Button/Button";
import MainSearchBar from "components/MainSearchBar/MainSearchBar";
import React, { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    navBarPaths: {
        [path: string]: string;
    };
};

const NavBar: FC<Props> = ({ navBarPaths }) => {
    const navigate = useNavigate();

    const handleNavClick = (path: string) => {
        return (event: MouseEvent<HTMLButtonElement>) => {
            navigate(`${path}`);
        };
    };

    return (
        <nav className="sticky z-10 top-0 p-4 bg-neutral-900 text-amber-100 drop-shadow-lg">
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
        </nav>
    );
};

export default NavBar;
