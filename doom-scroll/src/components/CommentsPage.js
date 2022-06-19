import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import {
  loadComments,
  selectComments,
  selectCommentsPost,
  setCommentsPathname,
  setCommentsSearch,
} from "../features/comments/commentsSlice";
import { CommentTree } from "./CommentTree";
import { Post } from "./Post";

export const CommentsPage = () => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const post = useSelector(selectCommentsPost);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    dispatch(setCommentsPathname(location.pathname));
    dispatch(setCommentsSearch(location.search));
  }, [location]);

  useEffect(() => {
    if (accessToken) {
      dispatch(loadComments());
    }
  }, [accessToken]);

  return (
    <div className="px-28 mt-8">
      <div>{post && <Post post={post} />}</div>
      <div className="mt-16">
        <CommentTree comments={comments} baseDepth={0} treeStartIndex={0} />
      </div>
    </div>
  );
};
