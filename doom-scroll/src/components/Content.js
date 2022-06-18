import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import {
  fetchListings,
  selectListings,
  selectPathname,
  selectSearch,
  updatePathname,
  updateSearch
} from "../features/listings/listingsSlice";
import { Listing } from "./Listing";

export const Content = () => {
  const location = useLocation();

  const accessToken = useSelector(selectAccessToken);
  const pathname = useSelector(selectPathname);
  const search = useSelector(selectSearch);
  const listings = useSelector(selectListings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    dispatch(updatePathname(location.pathname));
    dispatch(updateSearch(location.search));
  }, [location]);

  useEffect(() => {
    if (accessToken) {
      dispatch(
        fetchListings({
          accessToken: accessToken,
          pathname: pathname,
          search: search,
        })
      );
    }
  }, [accessToken, pathname, search]);

  return (
    <div>
      {listings.map((listing, index) => <Listing path={[index]} key={index} />)}
    </div>
  );
};
