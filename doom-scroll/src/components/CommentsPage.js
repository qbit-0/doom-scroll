import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import { fetchReddit } from "../utility/redditAPI";
import { Comment } from "./Comment";
import { Post } from "./Post";

export const CommentsPage = () => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchReddit({
        accessToken: accessToken,
        pathname: location.pathname,
        search: location.search,
      }).then((response) => {
        setPost(response[0].data.children[0]);
        setComments([...response[1].data.children]);
      });
    }
  }, [accessToken]);

  const replaceComment = (targetIndex, newComments) => {
    setComments([
      ...comments.slice(0, targetIndex),
      ...newComments,
      ...comments.slice(targetIndex + 1, comments.length),
    ]);
  };

  return (
    <div>
      {post && <Post post={post} />}
      {comments.map((comment, index) => (
        <Comment
          comment={comment}
          link={post.data.name}
          setSelf={(newComments) => {
            replaceComment(index, newComments);
          }}
          key={index}
        />
      ))}
    </div>
  );
};
