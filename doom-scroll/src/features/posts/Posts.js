import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post/Post";
import { selectAccessToken } from "../auth/authSlice";
import {
  loadMorePosts,
  loadPosts,
  selectHasError,
  selectIsLoading,
  selectPosts,
} from "./postsSlice";

export const Posts = ({ query }) => {
  const dispatch = useDispatch();

  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    if (accessToken !== null) {
      dispatch(loadPosts({ accessToken: accessToken, query: query }));
    }
  }, [query]);

  const containerRef = useRef(null);

  const options = {
    root: null,
    rootMargin: "2000px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      dispatch(loadMorePosts({ accessToken: accessToken, query: query }));
    }
  }, options);

  useEffect(() => {
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div>
      {posts.map((post) => <Post post={post} />)}
      <div ref={containerRef}></div>
    </div>
  );
};
