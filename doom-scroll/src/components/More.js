import { useSelector } from "react-redux";
import { selectListings } from "../features/listings/listingsSlice";
import { navListings } from "../utility/navListings";

export const More = ({ path }) => {
  const listings = useSelector(selectListings);
  const more = navListings(listings, path);

  const count = more.data.count;
  if (count === 0) {
    return <button to="#">Continue this thread</button>;
  } else
    return (
      <button to="#">{`${count} more ${
        more.data.count > 1 ? "replies" : "reply"
      }`}</button>
    );
};
