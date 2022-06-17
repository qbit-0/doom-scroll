import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import { fetchComments, selectCommentPost, selectCommentsChildren } from "../features/comments/commentsSlice";
import { Comments } from "./Comments";
import { Post } from "./Post";

export const CommentsPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const post = useSelector(selectCommentPost)
  const comments = useSelector(selectCommentsChildren);

  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(
        fetchComments({
          accessToken: accessToken,
          pathname: pathname,
          search: search,
        })
      );
    }
  }, [location, accessToken]);

  return (
    <div>
        <Post post={post}/>
        <Comments comments={comments} />
    </div>
  );
};
