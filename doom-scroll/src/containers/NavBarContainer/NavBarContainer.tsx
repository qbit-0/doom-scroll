import SearchBarContainer from "containers/SearchBarContainer/SearchBarContainer";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarContainer = () => {
    const navigate = useNavigate();

    const handleNavClick = (subreddit: string) => {
        navigate(`/r/${subreddit}`);
    };

    return (
        <nav className="sticky z-10 top-0 p-4 bg-neutral-900 text-amber-100 shadow-lg">
            <div className="w-fit mx-auto">
                <div className="inline-block">
                    <div className="inline-block mx-1">
                        <button
                            onClick={(e) => {
                                handleNavClick("popular");
                            }}
                            className="p-2 border-2 border-amber-100 rounded-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
                        >
                            <p className="inline font-bold">r/popular</p>
                        </button>
                    </div>

                    <div className="inline-block mx-1">
                        <button
                            onClick={(e) => {
                                handleNavClick("all");
                            }}
                            className="p-2 border-2 border-amber-100 rounded-3xl decoration-neutral-600 decoration-4 transition-all font-bold"
                        >
                            <p className="inline font-bold">r/all</p>
                        </button>
                    </div>
                </div>

                <div className="inline-block mx-1">
                    <SearchBarContainer />
                </div>
            </div>
        </nav>
    );
};

export default NavBarContainer;
