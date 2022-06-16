import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  retrieveAppAccessToken,
  selectAppAccessToken,
  selectUserAccessToken
} from "../../features/auth/authSlice";
import { Posts } from "../../features/posts/Posts";

export const Content = () => {
  const appAccessToken = useSelector(selectAppAccessToken);
  const userAccessToken = useSelector(selectUserAccessToken);
  const { subreddit } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (appAccessToken === null) {
      dispatch(retrieveAppAccessToken());
    }
  }, []);

  return <Posts subreddit={subreddit || "all"} />;
};
