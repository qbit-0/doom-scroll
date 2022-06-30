import Button, { ButtonStyle } from "components/Button/Button";
import SearchBarContainer from "components/MainSearchBar";
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
        <nav className="sticky z-10 top-0 p-4 bg-neutral-900 text-amber-100 shadow-lg">
            <div className="w-fit mx-auto">
                <div className="inline-block">
                    {Object.entries(navBarPaths).map((entry) => (
                        <div className="inline-block mx-1">
                            <Button
                                buttonStyle={ButtonStyle.PRIMARY}
                                onClick={handleNavClick(entry[0])}
                            >
                                <p className="inline font-bold">{entry[1]}</p>
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="inline-block mx-1">
                    <SearchBarContainer />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
