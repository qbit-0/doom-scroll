import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  retrieveAppAccessToken,
  selectAppAccessToken,
  selectUserAccessToken,
} from "../features/auth/authSlice";
import {
  fetchListings,
  selectListings,
} from "../features/listings/listingsSlice";
import { Listing } from "./Listing";

export const ListingsPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  const appAccessToken = useSelector(selectAppAccessToken);
  const userAccessToken = useSelector(selectUserAccessToken);
  const listings = useSelector(selectListings);

  useEffect(() => {
    if (appAccessToken || userAccessToken) {
      dispatch(fetchListings({ pathname: pathname, params: params }));
    } else {
      dispatch(retrieveAppAccessToken());
    }
  }, [location, appAccessToken, userAccessToken]);

  const renderListings = (listings) => {
    return listings.map((listing, index) => {
      return <Listing key={index} listing={listing} />;
    });
  };

  return <div>{renderListings(listings)}</div>;
};
