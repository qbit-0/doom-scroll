import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleNavClick = (subreddit: string) => {
    navigate(`/r/${subreddit}`);
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyDown: React.KeyboardEventHandler = () => {
    const params = new URLSearchParams();
    params.append("q", search);
    navigate(`/search?${params.toString()}`);
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    params.append("q", search);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 p-4 border-b-2 border-gray-800 bg-gray-900 shadow-md">
      <div className="w-fit mx-auto">
        <div className="inline-block">
          <div className="inline-block mr-2">
            <Button
              highlight={matchPath(location.pathname, "/r/popular") !== null}
              onClick={(e) => {
                handleNavClick("popular");
              }}
            >
              <p className="inline font-bold">r/popular</p>
            </Button>
          </div>

          <div className="inline-block mr-2">
            <Button
              highlight={matchPath(location.pathname, "/r/all") !== null}
              onClick={(e) => {
                handleNavClick("all");
              }}
            >
              <p className="inline font-bold">r/all</p>
            </Button>
          </div>
        </div>

        <div className="inline-block">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
