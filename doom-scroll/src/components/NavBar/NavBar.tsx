import Button, { ButtonStyle } from "components/Button/Button";
import SearchBar from "components/SearchBar/SearchBar";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NavBar: FC<Props> = (props) => {
    const navigate = useNavigate();

    const handleNavClick = (subreddit: string) => {
        navigate(`/r/${subreddit}`);
    };

    return (
        <nav className="sticky z-10 top-0 p-4 bg-neutral-900 text-amber-100 shadow-lg">
            <div className="w-fit mx-auto">
                <div className="inline-block">
                    <div className="inline-block mx-1">
                        <Button
                            buttonStyle={ButtonStyle.PRIMARY}
                            onClick={(e) => {
                                handleNavClick("popular");
                            }}
                        >
                            <p className="inline font-bold">r/popular</p>
                        </Button>
                    </div>

                    <div className="inline-block mx-1">
                        <Button
                            buttonStyle={ButtonStyle.PRIMARY}
                            onClick={(e) => {
                                handleNavClick("all");
                            }}
                        >
                            <p className="inline font-bold">r/all</p>
                        </Button>
                    </div>
                </div>

                <div className="inline-block mx-1">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
