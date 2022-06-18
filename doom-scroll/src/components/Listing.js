import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../features/auth/authSlice";
import { navListings } from "../utility/navListings";
import { Comment } from "./Comment";
import { More } from "./More";
import { Post } from "./Post";

export const Listing = ({ path }) => {
  const accessToken = useSelector(selectAccessToken);
  const pathname = useSelector(selectPathname);
  const search = useSelector(selectSearch);
  const listings = useSelector(selectListings);
  const listing = navListings(listings, path);
  const dispatch = useDispatch();

  const renderChildren = (listing) => {
    const children = listing.data.children;

    return children.map((child, index) => {
      switch (child.kind) {
        case "Listing":
          return <Listing key={index} path={[...path, index]} />;
        case "more":
          return <More key={index} path={[...path, index]} />;
        case "t1":
          return <Comment key={index} path={[...path, index]} />;
        case "t3":
          return <Post key={index} path={[...path, index]} />;
        default:
          return <h1 key={index}>ILLEGAL KIND</h1>;
      }
    });
  };

  return (
    <div>
      {renderChildren(listing)}
    </div>
  );
};
