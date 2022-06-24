import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CommentTree from "../../components/CommentTree/CommentTree";
import Post from "../../components/Post/Post";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import {
  selectAccessToken,
  updateAppToken,
} from "../../features/auth/authSlice";
import {
  loadComments,
  selectComments,
  selectCommentsIsLoadingNew,
  selectCommentsPost,
  setCommentsLocation,
} from "../../features/comments/commentsSlice";

type Props = {
  nlp: any; //TODO
};

const CommentsPage: React.FC<Props> = ({ nlp }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const post = useSelector(selectCommentsPost);
  const comments = useSelector(selectComments);
  const isLoadingNew = useSelector(selectCommentsIsLoadingNew);
  const dispatch = useDispatch();

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
        {!isLoadingNew && post && <Post post={post} nlp={nlp} />}
        {isLoadingNew && <PostPlaceholder />}
      </div>
      {!isLoadingNew && (
        <div className="pt-16">
          <CommentTree
            comments={comments}
            baseDepth={0}
            treeStartIndex={0}
            nlp={nlp}
          />
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
