import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { selectAccessToken } from "../../features/auth/authSlice";
import { Posts } from "../../features/posts/Posts";

export const Content = () => {
  const accessToken = useSelector(selectAccessToken);
  const { subreddit } = useParams();

  if (accessToken === null) {
    return <Navigate to="/login" />;
  }

  return <Posts query={subreddit} />;
};
