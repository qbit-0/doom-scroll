import { useSelector } from "react-redux";
import { selectListings } from "../features/listings/listingsSlice";
import { navListings } from "../utility/navListings";
import { Listing } from "./Listing";

export const Comment = ({ path }) => {
  const listings = useSelector(selectListings);
  const comment = navListings(listings, path);

  const renderReplies = (comment) => {
    if (comment.data.replies === undefined) return;

    const replies = comment.data.replies;
    if (replies === "") return;

    return <Listing path={[...path, 0]} />
  };

  return (
    <div className="p-2 mt-4 mr-0 mb-4 ml-2 border-t-2 border-l-2 border-solid border-blue-600">
      <p>{comment.data.body}</p>
      {renderReplies(comment)}
    </div>
  );
};
