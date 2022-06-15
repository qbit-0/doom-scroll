import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post/Post";
import {
  loadPosts,
  selectHasError,
  selectIsLoading,
  selectPosts,
} from "./postsSlice";

export const Posts = ({ subreddit }) => {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts(subreddit));
  }, [subreddit]);

  return <div>{generatePosts(posts, isLoading, hasError)}</div>;
};

const generatePosts = (posts, isLoading, hasError) => {
  if (isLoading) {
    return <p>Loading Posts...</p>;
  } else if (hasError) {
    return <p>Error...</p>;
  } else if (posts) {
    return posts.map((post) => <Post post={post} />);
  }
};