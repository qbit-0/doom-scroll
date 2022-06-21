import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import {
  loadComments,
  selectComments,
  selectCommentsIsLoading,
  selectCommentsPost,
  setCommentsLocation,
} from "../features/comments/commentsSlice";
import { CommentTree } from "./CommentTree";
import { Post } from "./Post";
import { PostPlaceholder } from "./PostPlaceholder";

export const CommentsPage = ({ nlp }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const post = useSelector(selectCommentsPost);
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectCommentsIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    dispatch(setCommentsLocation(location));
  }, [location]);

  useEffect(() => {
    if (accessToken) {
      dispatch(loadComments(nlp));
    }
  }, [accessToken]);

  return (
    <div className="px-28 py-8">
      <div>
        {post && <Post post={post} nlp={nlp} />}
        {isLoading && <PostPlaceholder />}
      </div>
      <div className="pt-16">
        <CommentTree
          comments={comments}
          baseDepth={0}
          treeStartIndex={0}
          nlp={nlp}
        />
      </div>
    </div>
  );
};
